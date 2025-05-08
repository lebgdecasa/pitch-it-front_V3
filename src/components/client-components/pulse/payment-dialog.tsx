import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { X } from 'lucide-react';
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-4 my-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Complete Your Order</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
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
          <div className="text-center">
            <p className="text-gray-600">Payment hasn't been implemented yet, just proceed.</p>
          </div>
          <div className="mt-6">
            <Button
              onClick={onSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Proceed
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
