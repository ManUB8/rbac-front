import React from "react";
import type { IStudentActivitySummaryResponse } from "../../interface/StudentReport.interface";
import "../../utils/print.css";
import { formatDateTH, formatDateThai, formatTimeRange } from "../../../../../shared/components/Date-Time/DateAndTime";

interface StudentReportPrintProps {
    student?: IStudentActivitySummaryResponse;
}

const StudentReportPrint: React.FC<StudentReportPrintProps> = ({ student }) => {
    const activityList = student?.activity ?? [];
    const ROWS_PER_PAGE = 4;

    const activityPages = [];

    for (let i = 0; i < activityList.length; i += ROWS_PER_PAGE) {
        activityPages.push(activityList.slice(i, i + ROWS_PER_PAGE));
    }

    if (activityPages.length === 0) {
        activityPages.push([]);
    }

    return (
        <div id="student-report-print" className="print-area">
            {activityPages.map((pageActivities, pageIndex) => {
                const emptyRows = ROWS_PER_PAGE - pageActivities.length;

                return (
                    <div
                        key={pageIndex}
                        className="print-page"
                        style={{
                            pageBreakAfter:
                                pageIndex < activityPages.length - 1
                                    ? "always"
                                    : "auto",
                        }}
                    >
                        <h4 className="print-title">
                            บันทึก การเข้าร่วมโครงการ/กิจกรรม ที่ทำประโยชน์ต่อสังคมหรือสาธารณะ
                            &nbsp;&nbsp;ภาคเรียนที่............. ปีการศึกษา.............
                        </h4>

                        <table className="print-table">
                            <thead>
                                <tr>
                                    <th>
                                        ชื่อโครงการ /กิจกรรม
                                        <br />
                                        ที่ทำประโยชน์ต่อสังคมหรือ
                                        <br />
                                        สาธารณะ
                                    </th>

                                    <th>
                                        สถานที่
                                        <br />
                                        ดำเนินโครงการ /กิจกรรม
                                    </th>

                                    <th>วัน / เดือน / ปี</th>

                                    <th>เวลา</th>

                                    <th>
                                        จำนวนชั่วโมง
                                        <br />
                                        (รวม) /วัน
                                    </th>

                                    <th>
                                        ลักษณะของกิจกรรม
                                        <br />
                                        (โดยละเอียด)
                                    </th>

                                    <th>
                                        ลายมือชื่อผู้รับรอง
                                        <br />
                                        (หัวหน้าหน่วยงานหรือ
                                        <br />
                                        ผู้ที่ได้รับมอบหมาย)
                                    </th>

                                    <th>
                                        ลายมือชื่อผู้รับรอง
                                        <br />
                                        (ผู้บริหารสถานศึกษาหรือ
                                        <br />
                                        ผู้ที่ได้รับมอบหมาย)
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {pageActivities.map((item) => (
                                    <tr key={item.student_activity_id}>
                                        <td>{item.activity_name ?? ""}</td>

                                        <td>{item.location ?? ""}</td>

                                        <td>
                                            {item.activity_date
                                                ? formatDateTH(item.activity_date)
                                                : ""}
                                        </td>

                                        <td>{formatTimeRange(item.start_time,item.end_time) ?? ""}</td>

                                        <td>{item.check_detail?.earned_hours ?? ""}</td>

                                        <td>{item.description ?? ""}</td>

                                        <td></td>

                                        <td></td>
                                    </tr>
                                ))}

                                {Array.from({ length: emptyRows }).map((_, index) => (
                                    <tr key={`empty-${pageIndex}-${index}`}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default StudentReportPrint;