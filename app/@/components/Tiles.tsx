import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Tile({
  title,
  value,
  description,
  className,
  variant,
}: {
  title: string;
  value: string;
  description: string;
  className?: string;
  variant?: "default" | "ghost";
}) {
  return (
    <Card className={`${variant === "ghost" && "border-none"} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
