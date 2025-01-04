import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
          </div>
        </section>

        {/* Content Sections will be added here */}
      </main>
    </>
  );
}
