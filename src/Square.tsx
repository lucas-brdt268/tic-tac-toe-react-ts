export type Mark = (string | null);

export interface Props{
    mark: Mark,
    onClick: () => void
};

export default function Square(props: Props) {
    //
    return <button onClick={props.onClick} className="square">{props.mark}</button>;
}