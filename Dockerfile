# =========================
# Stage 1: Build Vite app
# =========================
FROM node:22-alpine AS builder

# กำหนดโฟลเดอร์ทำงานใน container
WORKDIR /app

# คัดลอก package files ก่อน เพื่อใช้ cache
COPY package.json yarn.lock ./

# ติดตั้ง dependencies
RUN yarn install

# คัดลอกไฟล์ทั้งหมดเข้า container
COPY . .

# build production
RUN yarn build


# =========================
# Stage 2: Serve with nginx
# =========================
FROM nginx:1.27-alpine

# ลบไฟล์ default ของ nginx
RUN rm -rf /usr/share/nginx/html/*

# คัดลอกไฟล์ build จาก stage แรก
COPY --from=builder /app/dist /usr/share/nginx/html

# เปิด port 80
EXPOSE 80

# รัน nginx
CMD ["nginx", "-g", "daemon off;"]