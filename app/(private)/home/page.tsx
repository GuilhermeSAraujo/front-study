import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { DataTable } from "@/components/ui/data-table";
import { SectionCards } from "@/components/ui/section-cards";

import data from "./data.json";

export default function Page() {
  return (
    <div className="relative flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/0 backdrop-blur-sm">
        <div className="rounded-lg bg-background/20 px-8 py-6 shadow-lg border">
          <p className="text-2xl font-bold text-foreground">Em breve</p>
        </div>
      </div>
    </div>
  );
}
