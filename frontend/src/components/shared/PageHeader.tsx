interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold font-heading text-foreground">{title}</h1>
    {description && (
      <p className="mt-2 text-muted-foreground">{description}</p>
    )}
  </div>
);

export default PageHeader;
