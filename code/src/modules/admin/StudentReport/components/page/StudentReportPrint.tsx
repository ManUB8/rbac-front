import React from "react";
import type { IStudentActivityAllData } from "../../interface/StudentReport.interface";
import "../../utils/print.css";
import { formatDateThai } from "../../../../../shared/components/Date-Time/DateAndTime";

interface StudentReportPrintProps {
    student?: IStudentActivityAllData;
}

const StudentReportPrint: React.FC<StudentReportPrintProps> = ({ student }) => {
    const activityList = student?.activity ?? [];

    return (
        <div id="student-report-print" className="print-area">
            <div className="print-page landscape">
                <h4 className="print-title">
                    บันทึก การเข้าร่วมโครงการ/กิจกรรม ที่ทำประโยชน์ต่อสังคมหรือสาธารณะ&nbsp;
                    ภาคเรียนที่............. ปีการศึกษา.............
                </h4>

                <table className="print-table">
                    <thead>
                        <tr>
                            <th>ชื่อโครงการ /กิจกรรม<br />ที่ทำประโยชน์ต่อสังคมหรือ<br />สาธารณะ</th>
                            <th>สถานที่<br />ดำเนินโครงการ /กิจกรรม</th>
                            <th>วัน / เดือน / ปี</th>
                            <th>เวลา</th>
                            <th>จำนวนชั่วโมง<br />(รวม) /วัน</th>
                            <th>ลักษณะของกิจกรรม<br />(โดยละเอียด)</th>
                            <th>ลายมือชื่อผู้รับรอง<br />(หัวหน้าหน่วยงานหรือ<br />ผู้ที่ได้รับมอบหมาย)</th>
                            <th>ลายมือชื่อผู้รับรอง<br />(ผู้บริหารสถานศึกษาหรือ<br />ผู้ที่ได้รับมอบหมาย)</th>

                        </tr>
                    </thead>

                    <tbody>
                        {activityList.map((item) => (
                            <tr key={item.student_activity_id}>
                                <td>{item.activity_name || ""}</td>
                                <td>{item.location || ""}</td>
                                <td>{formatDateThai(item.activity_date) || ""}</td>
                                <td>{item.activity_time_text || ""}</td>
                                <td>{item.check_detail?.earned_hours ?? ""}</td>
                                <td>{item.description || ""}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}

                        {Array.from({ length: Math.max(0, 4 - activityList.length) }).map((_, index) => (
                            <tr key={`empty-${index}`}>
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
        </div>
    );
};

export default StudentReportPrint;