import { GoogleSheetsSetup } from "@/components/google-sheets-setup"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage integrations and test system functionality</p>
      </div>

      <GoogleSheetsSetup />
    </div>
  )
}
