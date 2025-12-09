import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CreditCard, CheckCircle, Clock, XCircle, Download, DollarSign } from 'lucide-react';
import { Button } from './ui/button';

type PaymentPageProps = {
  section: 'hostel' | 'tuition' | 'status' | 'receipts';
};

export function PaymentPage({ section }: PaymentPageProps) {
  const renderSection = () => {
    switch (section) {
      case 'hostel':
        return <HostelPayment />;
      case 'tuition':
        return <TuitionFee />;
      case 'status':
        return <PaymentStatus />;
      case 'receipts':
        return <PaymentReceipts />;
      default:
        return <PaymentStatus />;
    }
  };

  return (
    <div className="space-y-8">
      {renderSection()}
    </div>
  );
}

function HostelPayment() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Hostel Payment</h1>
      <p className="text-[#64748B] mb-8">Make payment for hostel accommodation</p>

      <Card className="border-4 border-[#0F172A] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CreditCard className="w-5 sm:w-6 h-5 sm:h-6 text-[#F59E0B]" />
            Hostel Fee Payment
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Academic Year 2024/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          <div className="p-4 sm:p-6 border-2 border-[#0F172A] rounded-lg bg-[#F8F9FA] space-y-3">
            <div className="flex justify-between items-center text-sm sm:text-base gap-2">
              <span style={{ fontFamily: 'var(--font-body)' }}>Hostel Type:</span>
              <span className="text-right font-semibold">Standard Room (Shared)</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base gap-2">
              <span style={{ fontFamily: 'var(--font-body)' }}>Duration:</span>
              <span className="text-right font-semibold">Full Academic Year</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base gap-2 pb-3 sm:pb-6 border-b-2 border-[#0F172A]">
              <span style={{ fontFamily: 'var(--font-body)' }}>Accommodation Fee:</span>
              <span className="text-right font-semibold">$850.00</span>
            </div>
            <div className="flex justify-between items-center text-lg sm:text-2xl gap-2">
              <span style={{ fontFamily: 'var(--font-display)' }}>Total:</span>
              <span style={{ fontFamily: 'var(--font-display)', color: '#F59E0B' }} className="font-bold">$850.00</span>
            </div>
            <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] py-3 sm:py-6 text-sm sm:text-base">
              <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Proceed to Payment
            </Button>
          </div>

          <div className="p-3 sm:p-4 border-2 border-[#3B82F6] rounded-lg bg-[#DBEAFE]">
            <p className="text-[#1E40AF] text-xs sm:text-sm">
              💡 Payment via Credit/Debit Card, Bank Transfer, or Mobile Money
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TuitionFee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Tuition Fee Payment</h1>
      <p className="text-[#64748B] mb-8">Make payment for tuition fees</p>

      <Card className="border-4 border-[#0F172A] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CreditCard className="w-5 sm:w-6 h-5 sm:h-6 text-[#F59E0B]" />
            Tuition Fee Payment
          </CardTitle>
          <CardDescription>Semester 1, 2024/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border-2 border-[#0F172A] rounded-lg bg-[#F8F9FA]">
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: 'var(--font-body)' }}>Program:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Computer Science (B.Sc)</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: 'var(--font-body)' }}>Registered Credits:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>18 Credits</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: 'var(--font-body)' }}>Cost per Credit:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>$120.00</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-[#0F172A]">
              <span style={{ fontFamily: 'var(--font-body)' }}>Additional Fees:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>$250.00</span>
            </div>
            <div className="flex justify-between items-center text-2xl mb-6">
              <span style={{ fontFamily: 'var(--font-display)' }}>Total Amount:</span>
              <span style={{ fontFamily: 'var(--font-display)', color: '#F59E0B' }}>$2,410.00</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-white border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] py-6">
                Pay Full Amount
              </Button>
              <Button className="bg-white hover:bg-[#F8F9FA] text-[#0F172A] border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] py-6">
                Pay Installment
              </Button>
            </div>
          </div>

          <div className="p-4 border-2 border-[#10B981] rounded-lg bg-[#D1FAE5]">
            <p className="text-[#065F46]" style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              ✓ 5% discount available for full payment before deadline
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PaymentStatus() {
  const payments = [
    { id: 'PAY-2024-001', type: 'Tuition Fee', amount: 2410, status: 'Completed', date: '2024-01-15' },
    { id: 'PAY-2024-002', type: 'Hostel Fee', amount: 850, status: 'Completed', date: '2024-01-20' },
    { id: 'PAY-2024-003', type: 'Library Fee', amount: 50, status: 'Pending', date: '2024-02-01' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Payment Status</h1>
      <p className="text-[#64748B] mb-8">Check the status of all your payments</p>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{payment.type}</CardTitle>
                    <CardDescription>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        ID: {payment.id} • Date: {payment.date}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-2xl" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      ${payment.amount.toFixed(2)}
                    </span>
                    <span className={`px-4 py-1 rounded-full border-2 border-[#0F172A] flex items-center gap-2 ${
                      payment.status === 'Completed' ? 'bg-[#10B981] text-white' :
                      payment.status === 'Pending' ? 'bg-[#F59E0B] text-white' :
                      'bg-[#EF4444] text-white'
                    }`} style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {payment.status === 'Completed' && <CheckCircle className="w-4 h-4" />}
                      {payment.status === 'Pending' && <Clock className="w-4 h-4" />}
                      {payment.status === 'Failed' && <XCircle className="w-4 h-4" />}
                      {payment.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function PaymentReceipts() {
  const receipts = [
    { id: 'REC-2024-001', type: 'Tuition Fee', amount: 2410, date: '2024-01-15', semester: 'Semester 1' },
    { id: 'REC-2024-002', type: 'Hostel Fee', amount: 850, date: '2024-01-20', semester: 'Full Year' },
    { id: 'REC-2023-045', type: 'Tuition Fee', amount: 2350, date: '2023-08-10', semester: 'Semester 2' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Payment Receipts</h1>
      <p className="text-[#64748B] mb-8">Download and view your payment receipts</p>

      <div className="space-y-4">
        {receipts.map((receipt, index) => (
          <motion.div
            key={receipt.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{receipt.type}</CardTitle>
                    <CardDescription>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        Receipt: {receipt.id} • {receipt.semester} • {receipt.date}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-2xl" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      ${receipt.amount.toFixed(2)}
                    </span>
                    <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white border-2 border-[#F59E0B] shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
