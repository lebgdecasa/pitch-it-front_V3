// src/components/project/publishing/PublishingForm.tsx
"use client";

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../../../components/ui/input';
import { Card } from '@/ui/card';
import { PublishingDraft } from '../../../mocks/publishing-data';

const publishingFormSchema = z.object({
  investmentSize: z.number()
    .min(1000, 'Investment size must be at least $1,000')
    .max(100000000, 'Investment size must be less than $100M'),
  equityOffered: z.number()
    .min(0.1, 'Equity offered must be at least 0.1%')
    .max(100, 'Equity offered cannot exceed 100%'),
  financialDetails: z.object({
    revenueLastYear: z.number().optional(),
    projectedRevenue: z.number().optional(),
    burnRate: z.number().optional(),
    runwayMonths: z.number().optional(),
    previousFunding: z.number().optional(),
  }),
});

interface PublishingFormProps {
  draft: PublishingDraft;
  onSave: (data: PublishingDraft) => void;
}

export default function PublishingForm({ draft, onSave }: PublishingFormProps) {
  const form = useForm<z.infer<typeof publishingFormSchema>>({
    resolver: zodResolver(publishingFormSchema),
    defaultValues: {
      investmentSize: draft.investmentSize,
      equityOffered: draft.equityOffered,
      financialDetails: draft.financialDetails,
    },
  });

  const onSubmit = (data: z.infer<typeof publishingFormSchema>) => {
    onSave({
      ...draft,
      ...data,
      lastSaved: new Date().toISOString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="investmentSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Size ($)*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="equityOffered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equity Offered (%)*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Financial Details</h3>
          <div className="space-y-4">
            {['revenueLastYear', 'projectedRevenue', 'burnRate', 'runwayMonths', 'previousFunding'].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={`financialDetails.${field}` as any}
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={value || ''}
                        onChange={e => onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Add more context to your investment proposal
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </Card>
      </form>
    </Form>
  );
}
