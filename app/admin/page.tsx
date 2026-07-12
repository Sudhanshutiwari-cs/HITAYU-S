'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  LogOut, RefreshCw, Calendar, Clock, User, Phone, Mail,
  MapPin, Stethoscope, CheckCircle, XCircle, AlertCircle,
  ChevronDown, Search, Filter, MessageSquare, X, Eye,
} from 'lucide-react'

type Appointment = {
  id: string
  full_name: string
  phone: string
  email: string | null
  address: string | null
  condition: string
  preferred_date: string
  preferred_time: string | null
  message: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  remarks: string | null
  created_at: string
}

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   icon: AlertCircle,  bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  dot: 'bg-amber-400'  },
  confirmed: { label: 'Confirmed', icon: CheckCircle,  bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  dot: 'bg-[#9BD22A]'  },
  cancelled: { label: 'Cancelled', icon: XCircle,      bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    dot: 'bg-red-400'    },
}

function StatusBadge({ status }: { status: Appointment['status'] }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

function AppointmentDetailModal({
  appt, onClose, onSave,
}: {
  appt: Appointment
  onClose: () => void
  onSave: (id: string, status: Appointment['status'], remarks: string) => Promise<void>
}) {
  const [status, setStatus] = useState<Appointment['status']>(appt.status)
  const [remarks, setRemarks] = useState(appt.remarks ?? '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onSave(appt.id, status, remarks)
    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e6f0fa] rounded-xl flex items-center justify-center">
              <User size={18} className="text-[#2B7ABB]" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">{appt.full_name}</h2>
              <p className="text-gray-400 text-xs">#{appt.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition" aria-label="Close">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Phone,       label: 'Mobile',   value: appt.phone },
              { icon: Mail,        label: 'Email',    value: appt.email ?? '—' },
              { icon: MapPin,      label: 'Address',  value: appt.address ?? '—' },
              { icon: Stethoscope, label: 'Concern',  value: appt.condition },
              { icon: Calendar,    label: 'Date',     value: new Date(appt.preferred_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
              { icon: Clock,       label: 'Time',     value: appt.preferred_time ?? '—' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 bg-gray-50 rounded-2xl p-3.5">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon size={14} className="text-[#2B7ABB]" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                  <p className="text-gray-900 text-sm font-medium break-words">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          {appt.message && (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-gray-400 text-xs mb-1.5 flex items-center gap-1.5"><MessageSquare size={12} /> Message</p>
              <p className="text-gray-700 text-sm leading-relaxed">{appt.message}</p>
            </div>
          )}

          {/* Status & Remarks edit */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Update Appointment</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'confirmed', 'cancelled'] as const).map(s => {
                  const cfg = STATUS_CONFIG[s]
                  return (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                        status === s
                          ? `${cfg.bg} ${cfg.text} ${cfg.border} ring-2 ring-offset-1 ring-current`
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Remarks (Optional)</label>
              <textarea
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                rows={3}
                placeholder="Add internal notes or remarks..."
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B7ABB] focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 rounded-full bg-[#2B7ABB] text-white text-sm font-bold hover:bg-[#1e5a8a] transition shadow-lg shadow-[#2B7ABB]/25 disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | Appointment['status']>('all')
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/appointments')
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setAppointments(data.appointments ?? [])
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  const handleSave = async (id: string, status: Appointment['status'], remarks: string) => {
    await fetch(`/api/admin/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, remarks }),
    })
    await fetchAppointments()
  }

  const handleLogout = async () => {
    setLogoutLoading(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const filtered = appointments.filter(a => {
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    const q = search.toLowerCase()
    const matchSearch = !q ||
      a.full_name.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      (a.email ?? '').toLowerCase().includes(q) ||
      a.condition.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const counts = {
    total:     appointments.length,
    pending:   appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2B7ABB] rounded-xl flex items-center justify-center">
              <Stethoscope size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-gray-900 text-sm">Hitayu Admin</p>
              <p className="text-gray-400 text-xs hidden sm:block">Appointment Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchAppointments}
              className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              aria-label="Refresh"
            >
              <RefreshCw size={14} className="text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total',     value: counts.total,     bg: 'bg-[#e6f0fa]', text: 'text-[#2B7ABB]',  dot: 'bg-[#2B7ABB]'  },
            { label: 'Pending',   value: counts.pending,   bg: 'bg-amber-50',  text: 'text-amber-700', dot: 'bg-amber-400'  },
            { label: 'Confirmed', value: counts.confirmed, bg: 'bg-[#f0f9e1]', text: 'text-green-700', dot: 'bg-[#9BD22A]'  },
            { label: 'Cancelled', value: counts.cancelled, bg: 'bg-red-50',    text: 'text-red-700',   dot: 'bg-red-400'    },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 sm:p-5`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                <p className={`text-xs font-semibold ${s.text}`}>{s.label}</p>
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${s.text}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, email or concern..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B7ABB] focus:border-transparent"
            />
          </div>
          <div className="relative flex-shrink-0">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
              className="pl-8 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2B7ABB] appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table / Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#2B7ABB]/30 border-t-[#2B7ABB] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700 text-base mb-1">No appointments found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Patient', 'Contact', 'Concern', 'Appointment', 'Status', 'Remarks', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(a => (
                    <tr key={a.id} className="hover:bg-gray-50 transition group">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900">{a.full_name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{new Date(a.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-700 flex items-center gap-1"><Phone size={11} className="text-gray-400" /> {a.phone}</p>
                        {a.email && <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1"><Mail size={10} className="text-gray-400" /> {a.email}</p>}
                        {a.address && <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1 max-w-[160px] truncate"><MapPin size={10} className="text-gray-400 flex-shrink-0" /> {a.address}</p>}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e6f0fa] text-[#2B7ABB] rounded-full text-xs font-semibold">
                          {a.condition}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-700 flex items-center gap-1.5"><Calendar size={12} className="text-gray-400" /> {new Date(a.preferred_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        {a.preferred_time && <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1.5"><Clock size={11} className="text-gray-400" /> {a.preferred_time}</p>}
                      </td>
                      <td className="px-4 py-4"><StatusBadge status={a.status} /></td>
                      <td className="px-4 py-4 max-w-[140px]">
                        {a.remarks
                          ? <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{a.remarks}</p>
                          : <span className="text-gray-300 text-xs italic">—</span>}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setSelected(a)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2B7ABB] text-white text-xs font-semibold rounded-xl hover:bg-[#1e5a8a] transition opacity-0 group-hover:opacity-100"
                        >
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="lg:hidden space-y-3">
              {filtered.map(a => (
                <div
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{a.full_name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{new Date(a.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1.5"><Phone size={11} className="text-gray-400" />{a.phone}</span>
                    {a.email && <span className="flex items-center gap-1.5 truncate"><Mail size={11} className="text-gray-400" />{a.email}</span>}
                    <span className="flex items-center gap-1.5"><Calendar size={11} className="text-gray-400" />{new Date(a.preferred_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                    {a.preferred_time && <span className="flex items-center gap-1.5"><Clock size={11} className="text-gray-400" />{a.preferred_time}</span>}
                  </div>
                  <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#e6f0fa] text-[#2B7ABB] rounded-full text-xs font-semibold">{a.condition}</span>
                    <span className="text-[#2B7ABB] text-xs font-semibold flex items-center gap-1"><Eye size={11} /> Tap to manage</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-xs text-right pt-1">Showing {filtered.length} of {appointments.length} appointments</p>
          </>
        )}
      </main>

      {/* Detail Modal */}
      {selected && (
        <AppointmentDetailModal
          appt={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
