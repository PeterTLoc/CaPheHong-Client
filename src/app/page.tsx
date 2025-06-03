export default function Home() {
  return (
    <div
      className="w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/cover.jpeg')",
        height: "calc(100vh - 5.25rem)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="flex justify-center">
          <main className="text-white flex flex-col justify-center">
            <h1 className="font-bold text-4xl whitespace-nowrap">
              Experience the Richness of Perfect Coffee
            </h1>
            <p className="text-sm mt-3">
              Premium coffee beans freshly roasted and delivered to your door.
            </p>
            <button
              className="mt-6 button font-bold text-black opacity-75 hover:opacity-100 duration-300"
              type="submit"
            >
              Browse
            </button>
          </main>
        </div>
      </div>
    </div>
  )
}
