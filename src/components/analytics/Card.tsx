type CardProps = {
  title: string;
  value: string | number;
};

export const Card = ({ title, value }: CardProps) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
  </div>
);
