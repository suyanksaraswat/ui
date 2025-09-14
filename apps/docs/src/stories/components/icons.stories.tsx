import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon, SearchIcon } from "@suyanksaraswat/design-system/icons";

// Icon metadata - add new icons here with their descriptions
const iconMetadata = {
  HomeIcon: {
    description: "Home icon for navigation",
    category: "Navigation",
  },
  SearchIcon: {
    description: "Search icon for search functionality",
    category: "Actions",
  },
} as const;

const meta: Meta = {
  title: "Components/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Custom SVG icons available in the design system. Icons can be imported from @suyanksaraswat/design-system/icons or individually for optimal tree-shaking. Use the search to filter icons by name.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Icon components mapping - add new icons here
// Using @suyanksaraswat/design-system/icons for optimal tree-shaking
//
// To add a new icon:
// 1. Import it: import { NewIcon } from "@suyanksaraswat/design-system/icons";
// 2. Add to iconComponents: NewIcon,
// 3. Add metadata (optional): NewIcon: { description: "...", category: "..." }
const iconComponents = {
  HomeIcon,
  SearchIcon,
} as const;

// Auto-generate available icons array
const availableIcons = Object.entries(iconComponents).map(
  ([name, component]) => {
    const metadata = iconMetadata[name as keyof typeof iconMetadata];
    const iconName = name.toLowerCase().replace("icon", "");
    return {
      name,
      component,
      importPath: `@suyanksaraswat/design-system/icons`,
      individualImportPath: `@suyanksaraswat/design-system/icons/${iconName}`,
      description: metadata?.description || `${name} icon`,
      category: metadata?.category || "General",
    };
  },
);

function IconsBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState(24);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIcons = availableIcons.filter(
    (icon) =>
      (icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || icon.category === selectedCategory),
  );

  const categories = [
    "All",
    ...Array.from(new Set(availableIcons.map((icon) => icon.category))),
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Icon Library</h2>
        <p className="text-muted-foreground">
          Browse and search through all available icons in the design system.
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="mb-2 block text-sm font-medium">
            Search Icons
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="size" className="mb-2 block text-sm font-medium">
            Icon Size
          </label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
            className="rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value={16}>16px</option>
            <option value={20}>20px</option>
            <option value={24}>24px</option>
            <option value={32}>32px</option>
            <option value={48}>48px</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        {filteredIcons.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">
              No icons found matching "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredIcons.map((icon) => {
              const IconComponent = icon.component;
              return (
                <div
                  key={icon.name}
                  className="group rounded-lg border border-border p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col items-center space-y-3">
                    {/* Icon Preview */}
                    <div className="flex size-16 items-center justify-center rounded-lg bg-muted">
                      <IconComponent
                        size={selectedSize}
                        className="text-foreground"
                      />
                    </div>

                    {/* Icon Info */}
                    <div className="space-y-1 text-center">
                      <h3 className="text-sm font-medium">{icon.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {icon.description}
                      </p>
                      <span className="inline-block rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {icon.category}
                      </span>
                    </div>

                    {/* Import Code */}
                    <div className="w-full space-y-1">
                      <div className="text-xs text-muted-foreground">
                        All icons:
                      </div>
                      <code className="block break-all rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {icon.importPath}
                      </code>
                      <div className="text-xs text-muted-foreground">
                        Individual:
                      </div>
                      <code className="block break-all rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {icon.individualImportPath}
                      </code>
                    </div>

                    {/* Usage Example */}
                    <div className="w-full">
                      <details className="group/details">
                        <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                          Usage Example
                        </summary>
                        <div className="mt-2 rounded bg-muted p-2 font-mono text-xs">
                          <div className="text-muted-foreground">
                            // Import all icons
                          </div>
                          <div className="text-foreground">
                            import {`{ ${icon.name} }`} from "{icon.importPath}
                            ";
                          </div>
                          <div className="mt-1 text-muted-foreground">
                            // Or import individual icon
                          </div>
                          <div className="text-foreground">
                            import {`{ ${icon.name} }`} from "
                            {icon.individualImportPath}";
                          </div>
                          <div className="mt-1 text-muted-foreground">
                            // Usage
                          </div>
                          <div className="text-foreground">
                            {`<${icon.name} size={${selectedSize}} className="text-primary" />`}
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const AllIcons: Story = {
  render: () => <IconsBrowser />,
};

// Dynamically generate individual icon stories
const iconStories = availableIcons.reduce(
  (stories, icon) => {
    const IconComponent = icon.component;
    stories[`${icon.name}Story`] = {
      render: () => (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{icon.name}</h3>
          <div className="flex items-center gap-4">
            <IconComponent size={24} className="text-primary" />
            <IconComponent size={32} className="text-primary" />
            <IconComponent size={48} className="text-primary" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              Import: <code>{icon.importPath}</code>
            </p>
            <p className="mt-1">{icon.description}</p>
          </div>
        </div>
      ),
    };
    return stories;
  },
  {} as Record<string, Story>,
);

// Export all dynamically generated stories
export const HomeIconStory = iconStories.HomeIconStory as Story;
export const SearchIconStory = iconStories.SearchIconStory as Story;

// Export any additional stories that might be added in the future
export const OtherIconStories = Object.fromEntries(
  Object.entries(iconStories).filter(
    ([key]) => key !== "HomeIconStory" && key !== "SearchIconStory",
  ),
) as Record<string, Story>;
