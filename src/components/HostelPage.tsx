import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Home, Calendar, Users, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';

type HostelPageProps = {
  section: 'reservation' | 'history';
};

export function HostelPage({ section }: HostelPageProps) {
  return (
    <div className="space-y-8">
      {section === 'reservation' ? <HostelReservation /> : <ReservationHistory />}
    </div>
  );
}

function HostelReservation() {
  const availableRooms = [
    { 
      building: 'Block A', 
      roomNo: 'A-205', 
      type: 'Standard (Shared)', 
      capacity: 2, 
      occupied: 0, 
      price: 850,
      amenities: ['WiFi', 'Study Desk', 'Wardrobe', 'Shared Bathroom']
    },
    { 
      building: 'Block B', 
      roomNo: 'B-310', 
      type: 'Standard (Shared)', 
      capacity: 2, 
      occupied: 1, 
      price: 850,
      amenities: ['WiFi', 'Study Desk', 'Wardrobe', 'Shared Bathroom']
    },
    { 
      building: 'Block C', 
      roomNo: 'C-102', 
      type: 'Premium (Single)', 
      capacity: 1, 
      occupied: 0, 
      price: 1200,
      amenities: ['WiFi', 'Study Desk', 'Wardrobe', 'Private Bathroom', 'AC']
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-2 sm:mb-3 text-2xl sm:text-4xl">Hostel Reservation</h1>
      <p className="text-[#64748B] mb-6 sm:mb-8 text-sm sm:text-base">Reserve your accommodation for the academic year</p>

      <div className="grid gap-4 sm:gap-6">
        {availableRooms.map((room, index) => (
          <motion.div
            key={room.roomNo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="border-3 sm:border-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2 text-lg sm:text-2xl">
                      <Home className="w-5 sm:w-6 h-5 sm:h-6 text-[#F59E0B] flex-shrink-0" />
                      <span className="line-clamp-2">{room.building} - Room {room.roomNo}</span>
                    </CardTitle>
                    <CardDescription>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                        {room.type}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#F59E0B' }}>
                      ${room.price}
                    </div>
                    <span className="text-[#64748B] text-xs sm:text-sm" style={{ fontSize: '0.75rem' }}>per year</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#64748B] flex-shrink-0" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                        Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-[#64748B] flex-shrink-0" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                        Available: {room.capacity - room.occupied} {room.capacity - room.occupied === 1 ? 'space' : 'spaces'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                      Amenities:
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {room.amenities.map(amenity => (
                        <span 
                          key={amenity}
                          className="px-2 sm:px-3 py-1 bg-[#F8F9FA] border border-sm:border-2 border-[#0F172A] rounded-full"
                          style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', fontFamily: 'var(--font-mono)' }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-[#E2E8F0]">
                  <Button 
                    className={`w-full py-4 sm:py-6 border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-sm sm:text-base ${
                      room.occupied === room.capacity 
                        ? 'bg-[#64748B] hover:bg-[#475569] text-white cursor-not-allowed' 
                        : 'bg-[#10B981] hover:bg-[#059669] text-white'
                    }`}
                    disabled={room.occupied === room.capacity}
                  >
                    {room.occupied === room.capacity ? 'Fully Occupied' : 'Reserve This Room'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="border-2 border-[#3B82F6] shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] bg-[#DBEAFE]">
          <CardContent className="p-6">
            <p className="text-[#1E40AF]" style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              💡 <strong>Important:</strong> Reservations are confirmed upon payment. First come, first served basis. Contact housing office for special accommodation requests.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ReservationHistory() {
  const reservations = [
    {
      year: '2024/2025',
      building: 'Block B',
      roomNo: 'B-205',
      type: 'Standard (Shared)',
      status: 'Active',
      checkIn: '2024-09-01',
      checkOut: '2025-06-30',
      amount: 850
    },
    {
      year: '2023/2024',
      building: 'Block A',
      roomNo: 'A-310',
      type: 'Standard (Shared)',
      status: 'Completed',
      checkIn: '2023-09-01',
      checkOut: '2024-06-30',
      amount: 800
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Reservation History</h1>
      <p className="text-[#64748B] mb-8">View your past and current hostel reservations</p>

      <div className="space-y-6">
        {reservations.map((reservation, index) => (
          <motion.div
            key={reservation.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`border-4 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] ${
              reservation.status === 'Active' 
                ? 'border-[#10B981]' 
                : 'border-[#0F172A]'
            }`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 mb-2">
                      <Home className="w-6 h-6 text-[#F59E0B]" />
                      {reservation.building} - Room {reservation.roomNo}
                    </CardTitle>
                    <CardDescription>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        Academic Year {reservation.year} • {reservation.type}
                      </span>
                    </CardDescription>
                  </div>
                  <span className={`px-4 py-2 rounded-full border-2 border-[#0F172A] flex items-center gap-2 ${
                    reservation.status === 'Active' ? 'bg-[#10B981] text-white' : 'bg-[#64748B] text-white'
                  }`} style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {reservation.status === 'Active' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    {reservation.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 border-2 border-[#0F172A] rounded-lg bg-[#F8F9FA]">
                    <p className="text-[#64748B] mb-1" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                      Check-In
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{reservation.checkIn}</p>
                  </div>
                  <div className="p-4 border-2 border-[#0F172A] rounded-lg bg-[#F8F9FA]">
                    <p className="text-[#64748B] mb-1" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                      Check-Out
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{reservation.checkOut}</p>
                  </div>
                  <div className="p-4 border-2 border-[#0F172A] rounded-lg bg-[#F8F9FA]">
                    <p className="text-[#64748B] mb-1" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                      Amount Paid
                    </p>
                    <p className="text-[#F59E0B]" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.25rem' }}>
                      ${reservation.amount}
                    </p>
                  </div>
                </div>

                {reservation.status === 'Active' && (
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white border-2 border-[#F59E0B] shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]">
                      View Details
                    </Button>
                    <Button className="flex-1 bg-white hover:bg-[#F8F9FA] text-[#0F172A] border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      Request Maintenance
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
