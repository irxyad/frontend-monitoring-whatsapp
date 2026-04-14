declare global {
  interface String {
    /**
     * contoh hasil: Hello world
     */
    capitalizeFirst(): string;
    /**
     * contoh hasil: Hello World
     */
    capitalizeWords(): string;
    /**
     * contoh hasil: hello-world
     */
    toSlug(): string;
    /**
     * contoh hasil: "Lorem ipsum dolor sit amet..." (jk maxLength lebih dari yg diset)
     */
    truncate(maxLength: number): string;
  }
}

String.prototype.capitalizeFirst = function (): string {
  if (!this) return '';
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.capitalizeWords = function (): string {
  if (!this) return '';
  return this.split(' ')
    .map((w) => w.capitalizeFirst())
    .join(' ');
};

String.prototype.toSlug = function (): string {
  return this.toLowerCase().trim().replace(/\s+/g, '-');
};

String.prototype.truncate = function (maxLength: number): string {
  if (this.length <= maxLength) return this.toString();
  return this.slice(0, maxLength) + '...';
};

export {};
