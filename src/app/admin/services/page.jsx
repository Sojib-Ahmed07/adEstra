// app/admin/services/page.jsx
import { isAdminAuthenticated } from '@/app/actions/admin'
import { getAllServices } from '@/app/actions/services'
import AdminServicesClient from '@/components/AdminServicesClient'

export default async function AdminServicesPage() {
    const authenticated = await isAdminAuthenticated()

    if (!authenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-28 lg:pt-36">
                <p className="text-sm font-semibold text-red-600">
                    Unauthorized. Please log in at /admin first.
                </p>
            </main>
        )
    }

    const services = await getAllServices()

    return (
        <main className="w-full pt-28 lg:pt-36 min-h-screen">
            <AdminServicesClient initialServices={services} />
        </main>
    )
}