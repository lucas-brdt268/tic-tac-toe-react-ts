import Square, { type Mark } from "./Square";

export type Marks = Mark[];

export interface Props{
    marks: Marks, 
    isNextX: boolean,
    winner: string | null,
    onPlay: (m: Marks) => void
}

export default function Board(props: Props) {
    //
    function handleClick(idxSquare: number) {
        //
        if(props.marks[idxSquare] || props.winner) return;

        const nextMarks: Marks = props.marks.slice();
        nextMarks[idxSquare] = (props.isNextX ? 'X' : 'O');
        props.onPlay(nextMarks);
    }

    function createRow(idxArray: number[]) {
        //
        const squares = idxArray.map((idx: number) => {
            return (<Square key={idx} mark={props.marks[idx]} onClick={() => handleClick(idx)} />);
        });
        return <div className="board-row">{squares}</div>;
    }

    let status;
    if(props.winner) {
        status = `Winner: ${props.winner}`;
    } else {
        status = `Next: ${props.isNextX ? 'X' : 'O'}`;
    }
    
    return (
        <>
            <div className="status">{status}</div>
            {createRow([0, 1, 2])}
            {createRow([3, 4, 5])}
            {createRow([6, 7, 8])}
        </>
    );
}