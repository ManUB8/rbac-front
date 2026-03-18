// RoutesByModalFlag.ts
import type { RouteObject } from 'react-router';
import { routesConfig } from './router';
import type { IChildrenRouter, IRouterConfig } from './Router.interface';

type AnyRoute = IChildrenRouter; // ลูกจะ extends IRouterConfig อยู่แล้ว

const gatherAllChildren = (nodes: IRouterConfig[]): AnyRoute[] => {
    const out: AnyRoute[] = [];

    const walk = (arr?: AnyRoute[]) => {
        if (!arr) return;
        for (const n of arr) {
            out.push(n);
            if (n.children?.length) walk(n.children as AnyRoute[]);
            if (n.childrens?.length) walk(n.childrens as AnyRoute[]);
        }
    };

    for (const root of nodes) {
        // ถ้า root เองมี element/path ด้วย ให้เก็บเป็น route ด้วย
        out.push(root as AnyRoute);

        if ((root as AnyRoute).children?.length)
            walk((root as AnyRoute).children as AnyRoute[]);
        if ((root as AnyRoute).childrens?.length)
            walk((root as AnyRoute).childrens as AnyRoute[]);
    }

    // กรองเฉพาะอันที่มี path + element เท่านั้น
    return out.filter(r => !!r.path && !!r.element);
};

export function collectRoutesByModalFlag(
    privateRoutes: IRouterConfig[]
): { normal: RouteObject[]; modal: RouteObject[] } {
    const all = gatherAllChildren(privateRoutes);

    const toRouteObject = (r: AnyRoute): RouteObject => ({
        path: r.path!,
        element: r.element!,
    });

    const modal = all.filter(r => !!r.modal).map(toRouteObject);
    const normal = all.filter(r => !r.modal).map(toRouteObject);

    // กันซ้ำ (กรณีมี route เดิมในหลายชั้น)
    const uniqByPath = (arr: RouteObject[]) => {
        const seen = new Set<string>();
        return arr.filter(r => {
            const key = String(r.path);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    };

    return {
        normal: uniqByPath(normal),
        modal: uniqByPath(modal),
    };
}

const reFromPath = (p: string) =>
    new RegExp(
        '^' +
        p
            .replace(/\/+$/, '')
            .replace(/:[^/]+/g, '[^/]+')
            .replace(/\//g, '\\/') +
        '$'
    );

export function getRouteNameByPath(pathname: string): string {
    const cleanPath = pathname.replace(/\/+$/, '');
    const all = gatherAllChildren(routesConfig.privateRoutes)
        .filter(r => !!r.path && !!r.element); // กันของว่าง

    // เลือกเฉพาะที่ path ตรง
    const matches = all.filter(r => reFromPath(r.path!).test(cleanPath));

    if (matches.length === 0) return '';

    // จัดอันดับ:
    // 1) path ยาวกว่า → เฉพาะเจาะจงกว่า (ลึกกว่า มักจะเป็น childrens)
    // 2) ถ้ายาวเท่ากัน → modal: true ได้ก่อน
    matches.sort((a, b) => {
        const la = a.path!.length;
        const lb = b.path!.length;
        if (lb !== la) return lb - la;            // ยาวกว่า มาก่อน
        const am = !!a.modal ? 1 : 0;
        const bm = !!b.modal ? 1 : 0;
        if (bm !== am) return bm - am;            // modal ก่อน
        return 0;
    });

    return matches[0].name || '';
}