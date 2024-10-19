export const Header = ({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: React.ReactNode;
}) => {
  return (
    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-neutral-400">{description}</p>
      </div>
      <div>
        <div className="inline-flex gap-x-2">{actions}</div>
      </div>
    </div>
  );
};
