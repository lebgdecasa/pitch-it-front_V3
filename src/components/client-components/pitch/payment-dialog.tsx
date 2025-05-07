"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Dialog, DialogContent } from '../../../components/ui/dialog';

interface PaymentDialogProps {
  projectId: string;
  projectName: string;
  amount: number;
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentDialog({
  projectId,
  projectName,
  amount,
  onClose,
  onComplete,
}: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentTab, setPaymentTab] = useState("credit-card");

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Complete Purchase</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-lg mb-2">Order Summary</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Virtual VC Pitch Evaluation</span>
                <span className="text-gray-900 font-medium">${amount}</span>
              </div>
              <div className="text-sm text-gray-500 mb-3">Project: {projectName}</div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${amount}</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <Tabs defaultValue="credit-card" onValueChange={setPaymentTab}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input id="card-name" placeholder="J. Smith" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal">
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600">Click the button below to pay with PayPal</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.067 8.478c.492.57.738 1.323.738 2.157 0 2.154-1.843 4.178-4.145 4.178h-1.87l-.467 2.956H10.25l.15-.946h-.033l1.07-6.77h.033L11.736 8.8h3.132c1.008 0 1.924.292 2.523.862l-2.492 2.415h5.168v-3.6z" fill="#002C8A"/>
                        <path d="M18.96 10.635c0 1.355-1.165 2.46-2.604 2.46h-1.807l-.434 2.748h-2.406l1.254-7.942h4.212c1.124 0 2.033.92 2.033 2.05 0 .236-.048.46-.133.669l-.115.015z" fill="#009BE1"/>
                        <path d="M9.394 7.154l-1.407 8.925H5.581l1.407-8.925h2.406z" fill="#001F6B"/>
                      </svg>
                      Connect to PayPal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePayment}
                className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${amount}`}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-4 text-center text-xs text-gray-500">
            <p>This is a demo payment form. No actual charges will be made.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
