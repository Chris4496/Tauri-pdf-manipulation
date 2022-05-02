
export function calcFirstThreePages(numberOfStudents: number, totalPage: number): number[][] {
    const pages_per_student = Math.ceil(totalPage / numberOfStudents);
    const res: number[][] = [];

    // prevent memory useage
    if (numberOfStudents < 1) return [];


    for (let i=0; i<pages_per_student; i++) {
        let temp = []
        temp.push(i+1);
        temp.push(i+1+pages_per_student);
        temp.push(i+1+pages_per_student*2);
        res.push(temp);
    }

    return res;
}