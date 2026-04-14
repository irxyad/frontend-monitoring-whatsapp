type SpacerProps = {
  size?: number;
  axis?: 'horizontal' | 'vertical';
};

/**
 *  Harus parentnya flex atau grid, kalau ga, dia gk bakal ngambil space yang ada
 */
export default function Spacer({ size, axis = 'vertical' }: SpacerProps) {
  if (size) {
    return axis === 'horizontal' ? (
      <div style={{ width: size }} />
    ) : (
      <div style={{ height: size }} />
    );
  }

  return <div className="flex-1" />;
}
