export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen">
        <div className="grid grid-cols-8 gap-5">
          <div className="col-span-8 md:col-start-3 md:col-span-4">
            {children}
          </div>
        </div>
      </div>
    );
  }