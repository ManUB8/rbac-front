// =========================
// สรุปจำนวนพื้นฐาน
// ใช้สำหรับข้อมูลสถิติที่มีจำนวนต่าง ๆ
// =========================
export interface IStatisticSummary {
    // จำนวนนักศึกษาทั้งหมด
    count_student: number;

    // จำนวนที่เข้าร่วมกิจกรรม
    joined_count: number;

    // จำนวนที่ไม่เข้าร่วมกิจกรรม
    not_joined_count: number;

    // จำนวนที่เช็คอิน
    checkin_count: number;

    // จำนวนที่เช็คเอาท์
    checkout_count: number;

    // จำนวนทั้งหมดที่นำมาคำนวณ
    total_student: number;

    // เปอร์เซ็นต์การเข้าร่วม
    join_rate_percent: number;
}

// =========================
// ข้อมูลกิจกรรม
// ใช้ใน top_activity และ activity_rank
// =========================
export interface IActivityRankItem {
    // รหัสกิจกรรม
    activity_id: number;

    // ชื่อกิจกรรม
    activity_name: string;

    // วันที่จัดกิจกรรม
    activity_date: string;

    // เวลาเริ่ม
    start_time: string;

    // เวลาสิ้นสุด
    end_time: string;

    // จำนวนชั่วโมงกิจกรรม
    hours: number;

    // สถานที่จัดกิจกรรม
    location: string;

    // ประเภทการเช็ค
    // checkin = เช็คอินอย่างเดียว
    // checkout = เช็คเอาท์อย่างเดียว
    // checkin_checkout = เช็คอินและเช็คเอาท์
    check_type: string;

    // ต้องลงทะเบียนก่อนหรือไม่
    require_registration: boolean;

    // จำนวนเข้าร่วม
    joined_count: number;

    // จำนวนไม่เข้าร่วม
    not_joined_count: number;

    // จำนวนเช็คอิน
    checkin_count: number;

    // จำนวนเช็คเอาท์
    checkout_count: number;

    // จำนวนรวมทั้งหมด
    total_count: number;

    // เปอร์เซ็นต์การเข้าร่วม
    join_rate_percent: number;

    // เปอร์เซ็นต์การเช็คเอาท์
    checkout_rate_percent: number;
}

// =========================
// อันดับคณะ
// =========================
export interface IFacultyRankItem {
    // รหัสคณะ
    faculty_id: number;

    // ชื่อคณะ
    faculty_name: string;

    // จำนวนนักศึกษาทั้งหมด
    total_student: number;

    // จำนวนเข้าร่วม
    joined_count: number;

    // จำนวนไม่เข้าร่วม
    not_joined_count: number;

    // จำนวนเช็คอิน
    checkin_count: number;

    // จำนวนเช็คเอาท์
    checkout_count: number;

    // เปอร์เซ็นต์การเข้าร่วม
    join_rate_percent: number;
}

// =========================
// อันดับสาขา
// =========================
export interface IMajorRankItem {
    // รหัสสาขา
    major_id: number;

    // ชื่อสาขา
    major_name: string;

    // รหัสคณะ
    faculty_id: number;

    // ชื่อคณะ
    faculty_name: string;

    // จำนวนนักศึกษาทั้งหมด
    total_student: number;

    // จำนวนเข้าร่วม
    joined_count: number;

    // จำนวนไม่เข้าร่วม
    not_joined_count: number;

    // จำนวนเช็คอิน
    checkin_count: number;

    // จำนวนเช็คเอาท์
    checkout_count: number;

    // เปอร์เซ็นต์การเข้าร่วม
    join_rate_percent: number;
}

// =========================
// สถิติรายชั้นปี
// =========================
export interface IYearCount extends IStatisticSummary {
    // ชื่อชั้นปี
    // เช่น ปี 1, ปี 2, บัณฑิต
    name: string;
}

// =========================
// ข้อมูลสาขาภายในคณะ
// =========================
export interface IMajorSummary {
    // รหัสสาขา
    major_id: number;

    // ชื่อสาขา
    major_name: string;
    total_student: number;
    joined_count: number;
    not_joined_count: number;

}

// =========================
// ข้อมูลคณะ
// =========================
export interface IFacultySummary extends IStatisticSummary {
    faculty_id: number;
    faculty_name: string;
    major: IMajorSummary[];
    total_student: number;
    joined_count: number;
    not_joined_count: number;
}

// =========================
// Data หลักของ Dashboard
// =========================
export interface IActivityDashboardData {
    // จำนวนกิจกรรมทั้งหมด
    activity_count: number;

    // จำนวนผู้เข้าร่วม
    joined_count: number;

    // จำนวนผู้ไม่เข้าร่วม
    not_joined_count: number;

    // จำนวนเช็คอิน
    checkin_count: number;

    // จำนวนเช็คเอาท์
    checkout_count: number;

    // จำนวนนักศึกษาทั้งหมด
    student_count_all: number;

    // จำนวนชั่วโมงกิจกรรมรวม
    hours_count_all: number;

    // เปอร์เซ็นต์การเข้าร่วม
    join_rate_percent: number;

    // เปอร์เซ็นต์การเช็คเอาท์
    checkout_rate_percent: number;

    // กิจกรรมอันดับสูงสุด
    top_activity: IActivityRankItem;

    // กิจกรรมที่ถูกเลือก
    selected_activity: IActivityRankItem;

    // อันดับกิจกรรม
    activity_rank: IActivityRankItem[];

    // อันดับคณะ
    faculty_rank: IFacultyRankItem[];

    // อันดับสาขา
    major_rank: IMajorRankItem[];

    // ข้อมูลรายปี
    year_count: IYearCount[];

    // ข้อมูลคณะ + สาขา
    faculty: IFacultySummary[];
}

// =========================
// Response หลักจาก API
// =========================
export interface IActivityDashboardResponse {
    detail: string;
    data: IActivityDashboardData;
}

export interface ICardItem {
    title: string;
    value: string | number;
    color: string;
    icon: React.ReactNode;
}