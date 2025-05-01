export default function GridLayout({ children }: { children: React.ReactNode }) {
    return (
      <div
        className="grid gap-[20px] px-[20px]  w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        }}
      >
        {children}
      </div>
    );
  }