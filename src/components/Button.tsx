interface IProps {
    label: string
    onClick: () => void
}

export default function Button({ label, onClick }: IProps) {
    return (
        <button className={`px-4 py-1 mx-10 my-4 rounded border-2`} onClick={onClick}>
            {label}
        </button>
    )
}
