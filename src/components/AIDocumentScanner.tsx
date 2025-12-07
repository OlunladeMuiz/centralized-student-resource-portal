import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Upload, FileText, Camera, CheckCircle2, AlertCircle, Sparkles, Scan, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExtractedData {
  type: 'transcript' | 'receipt' | 'id' | 'certificate';
  confidence: number;
  data: Record<string, any>;
}

export function AIDocumentScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setIsScanning(true);

    // Simulate AI processing (GPT-4 Vision, Tesseract OCR, or Google Document AI)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock extracted data - in production, this would call GPT-4 Vision API
    const mockData = generateMockExtraction(file.name);
    setExtractedData(mockData);
    setIsScanning(false);
  };

  const generateMockExtraction = (filename: string): ExtractedData => {
    const lower = filename.toLowerCase();

    if (lower.includes('transcript') || lower.includes('grade')) {
      return {
        type: 'transcript',
        confidence: 0.94,
        data: {
          studentName: 'John Doe',
          studentId: 'STU-2024-001',
          semester: 'Fall 2024',
          gpa: '3.8',
          courses: [
            { code: 'CS301', name: 'Data Structures', grade: 'A', credits: 4 },
            { code: 'MATH202', name: 'Discrete Mathematics', grade: 'A-', credits: 3 },
            { code: 'ENG101', name: 'Technical Writing', grade: 'B+', credits: 3 },
            { code: 'CS305', name: 'Database Systems', grade: 'A', credits: 4 }
          ],
          totalCredits: 14,
          issueDate: '2024-12-15',
          institution: 'Tech University'
        }
      };
    }

    if (lower.includes('receipt') || lower.includes('payment')) {
      return {
        type: 'receipt',
        confidence: 0.97,
        data: {
          receiptNumber: 'RCP-2024-5432',
          paymentDate: '2024-11-30',
          amount: '$3,500.00',
          paymentMethod: 'Credit Card',
          description: 'Tuition Fee - Fall 2024',
          paidBy: 'John Doe',
          status: 'Completed',
          transactionId: 'TXN-98765-ABC'
        }
      };
    }

    if (lower.includes('id') || lower.includes('card')) {
      return {
        type: 'id',
        confidence: 0.92,
        data: {
          fullName: 'John Michael Doe',
          studentId: 'STU-2024-001',
          dateOfBirth: '2002-05-15',
          program: 'Computer Science',
          year: 'Junior',
          validUntil: '2026-06-30',
          bloodGroup: 'O+',
          emergencyContact: '+1 (555) 123-4567'
        }
      };
    }

    return {
      type: 'certificate',
      confidence: 0.89,
      data: {
        certificateName: 'Course Completion Certificate',
        awardedTo: 'John Doe',
        courseName: 'Advanced Machine Learning',
        completionDate: '2024-11-20',
        instructor: 'Dr. Sarah Smith',
        grade: 'A',
        certificateId: 'CERT-ML-2024-789'
      }
    };
  };

  const applyExtractedData = () => {
    // In production, this would auto-fill forms or update database
    alert('Data applied successfully! In production, this would:\n\n• Auto-fill relevant forms\n• Update your student profile\n• Add courses to your record\n• Process payments automatically\n• Verify credentials');
    setExtractedData(null);
    setPreview(null);
  };

  return (
    <Card className="p-6 border-4 border-[#0F172A] shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl">
          <Scan className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-xl">AI Document Scanner</h3>
          <p className="text-sm text-gray-600">Upload documents for instant data extraction</p>
        </div>
      </div>

      {/* Upload Area */}
      {!preview && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="border-4 border-dashed border-[#0F172A] rounded-xl p-12 text-center cursor-pointer hover:bg-gray-50 transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Upload className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
          </motion.div>
          <h4 className="font-bold mb-2">Upload Document</h4>
          <p className="text-sm text-gray-600 mb-4">
            Drag & drop or click to upload transcripts, receipts, IDs, or certificates
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">📄 Transcripts</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">💳 Receipts</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">🪪 ID Cards</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">🎓 Certificates</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </motion.div>
      )}

      {/* Preview and Scanning */}
      {preview && (
        <div className="space-y-4">
          <div className="relative border-4 border-[#0F172A] rounded-xl overflow-hidden">
            <img src={preview} alt="Document preview" className="w-full max-h-96 object-contain bg-gray-100" />
            {isScanning && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                  >
                    <Sparkles className="w-16 h-16 text-[#F59E0B] mx-auto" />
                  </motion.div>
                  <h4 className="font-bold mb-2">AI Processing Document...</h4>
                  <div className="flex flex-col gap-2 text-sm">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      ✓ Detecting document type
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      ✓ Extracting text with OCR
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      ✓ Analyzing with GPT-4 Vision
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      ✓ Structuring data
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Extracted Data */}
          <AnimatePresence>
            {extractedData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-4 border-green-500 rounded-xl p-6 bg-green-50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-bold text-green-900">Extraction Complete!</h4>
                    <p className="text-sm text-green-700">
                      Confidence: {(extractedData.confidence * 100).toFixed(0)}% • Type: {extractedData.type}
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-green-300 rounded-lg p-4 mb-4">
                  <h5 className="font-bold mb-3 text-[#0F172A]">Extracted Information:</h5>
                  <div className="space-y-2">
                    {Object.entries(extractedData.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start border-b border-gray-200 pb-2">
                        <span className="text-sm text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm font-medium text-right max-w-xs">
                          {Array.isArray(value) ? (
                            <div className="space-y-1">
                              {value.map((item, idx) => (
                                <div key={idx} className="text-xs bg-gray-100 p-2 rounded">
                                  {typeof item === 'object' 
                                    ? Object.values(item).join(' • ')
                                    : item
                                  }
                                </div>
                              ))}
                            </div>
                          ) : (
                            String(value)
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={applyExtractedData}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white border-2 border-[#0F172A]"
                  >
                    <FileCheck className="w-4 h-4 mr-2" />
                    Apply Data
                  </Button>
                  <Button
                    onClick={() => {
                      setExtractedData(null);
                      setPreview(null);
                    }}
                    variant="outline"
                    className="border-2 border-[#0F172A]"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* AI Features */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-[#0F172A] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-5 h-5 text-purple-600" />
            <h5 className="font-bold text-sm">GPT-4 Vision</h5>
          </div>
          <p className="text-xs text-gray-600">Advanced image understanding and text extraction</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-[#0F172A] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <h5 className="font-bold text-sm">Smart OCR</h5>
          </div>
          <p className="text-xs text-gray-600">Intelligent character recognition with 98% accuracy</p>
        </div>
      </div>
    </Card>
  );
}
