'use Client';

interface KeyMoneyProps {
    keyName: string;
    value: string;
}

export default function KeyMoney({ keyName, value }: KeyMoneyProps) {
    return (
        <div className="flex flex-col lg:text-2xl">
            <h4 className="font-medium">{keyName}</h4>
            <h1 className="">{value}</h1>
        </div>
    );
}