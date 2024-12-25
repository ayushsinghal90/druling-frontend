interface StepHeaderProps {
  header: string;
  description: string;
}

export const StepHeader = ({ header, description }: StepHeaderProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900">{header}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};
