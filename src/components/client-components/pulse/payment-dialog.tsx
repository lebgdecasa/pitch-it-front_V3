import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { X, CreditCard, Check, LockIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  amount: number;
  projectName: string;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  open, 
  onClose, 
  onSubmit,
  amount,
  projectName
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiryDate(e.target.value);
    setExpiryDate(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Redirect after successful payment
      setTimeout(() => {
        onSubmit();
      }, 2000);
    }, 2000);
  };

  const isFormValid = cardNumber.replace(/\s/g, '').length === 16 && 
    cardName && 
    expiryDate.length === 5 && 
    cvv.length === 3;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-4 my-8">
          {!isComplete ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Complete Your Order</h3>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Real-World Pulse for {projectName}</span>
                  <span className="font-bold text-gray-900">${amount.toLocaleString()}</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        id="card-number"
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10"
                        disabled={isProcessing}
                      />
                      <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      id="card-name"
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Smith"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        id="expiry-date"
                        type="text"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={isProcessing}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          id="cvv"
                          type="text"
                          value={cvv}
                          onChange={(e) => setCVV(e.target.value.replace(/\D/g, '').substring(0, 3))}
                          placeholder="123"
                          maxLength={3}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10"
                          disabled={isProcessing}
                        />
                        <LockIcon className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mt-6 mb-4">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={isProcessing}
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                  </label>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!isFormValid || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Pay ${amount.toLocaleString()}</>
                  )}
                </Button>
                
                <div className="flex items-center justify-center mt-4">
                  <LockIcon className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">Secure payment processing</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Payment Successful</h3>
                <p className="text-gray-600 mt-2">Your order has been confirmed!</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount paid</span>
                  <span className="font-bold text-gray-900">${amount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-6">
                  Redirecting you to track your order status...
                </p>
                <div className="animate-pulse">
                  <div className="h-1 bg-blue-600 rounded"></div>
                </div>
              </div>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;