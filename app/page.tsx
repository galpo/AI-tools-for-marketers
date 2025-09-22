"use client";

import { useMemo, useState } from "react";
import type { Tool } from "@/data/tools";
import { tools as RAW_TOOLS } from "@/data/tools";
import { Tabs, TabsContent, TabsList, TabsTrigger } from 
"@/components/ui/tabs";

export default function ToolsPage() {
  // Seed state from the local data module
  const [tools] = useState<Tool[]>(RAW_TOOLS);
  const [activeCat, setActiveCat] = useState<string>("All");

  // Build category pills from your data (includes "All")
  const categories = useMemo(() => {
    const s = new Set<string>(["All"]);
    for (const t of tools) (t.CategoriesArray?.length ? t.CategoriesArray 
: [t.category]).forEach(c => c && s.add(c));
    return Array.from(s);
  }, [tools]);

  // Filter by active category
  const visible = useMemo(
    () =>
      activeCat === "All"
        ? tools
        : tools.filter(t =>
            (t.CategoriesArray?.length ? t.CategoriesArray : 
[t.category]).some(c => c === activeCat)
          ),
    [tools, activeCat]
  );

  return (
    <div className="p-6">
      <Tabs value={activeCat} onValueChange={setActiveCat}>
        <TabsList className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Optional: a catch-all content slot */}
        <TabsContent value={activeCat} className="mt-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map(t => (
              <li key={t.id} className="rounded-2xl border p-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm 
text-muted-foreground">{t.category}</div>
                {t.description && <p className="mt-2 
text-sm">{t.description}</p>}
                <div className="mt-2 text-sm">
                  {t.pricing && <div>{t.pricing}</div>}
                  {t.url && (
                    <a href={t.url} target="_blank" rel="noreferrer" 
className="underline">
                      Visit site
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}

