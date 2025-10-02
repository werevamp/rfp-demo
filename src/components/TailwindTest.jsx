export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tailwind CSS Test
        </h1>

        <div className="space-y-4">
          <div className="border border-gray-200 p-4 rounded-md">
            <p className="text-gray-600">Testing border-gray-200 ✓</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 bg-blue-50">
            <p className="text-blue-700">Border colors working ✓</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded border border-emerald-200">
              <span className="text-sm font-medium">Emerald</span>
            </div>
            <div className="bg-amber-50 text-amber-700 p-3 rounded border border-amber-200">
              <span className="text-sm font-medium">Amber</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-200 font-medium">
            Hover me to test transitions
          </button>

          <div className="text-xs text-gray-500 mt-4">
            If all styles above render correctly, Tailwind CSS is working properly!
          </div>
        </div>
      </div>
    </div>
  )
}