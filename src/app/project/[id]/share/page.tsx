'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Clipboard, Mail, Link as LinkIcon, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { projectData } from '../../../../mocks';

export default function ShareProjectPage() {
  const { id } = useParams();
  const project = projectData.find((p: { id: string | string[]; name: string; }) => p.id === id) || (projectData as unknown as { id: string | string[]; name: string; }[])[0];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState<'private' | 'team' | 'public'>('private');
  const [inviteEmail, setInviteEmail] = useState('');

  const shareableLink = `https://pitchit.app/project/${id}/view`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success('Link copied to clipboard!');
  };

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    // This would actually send an invite in a real application
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
  };

  const handleVisibilityChange = (newVisibility: 'private' | 'team' | 'public') => {
    setSelectedVisibility(newVisibility);
    setDialogOpen(false);
    toast.success(`Project visibility set to ${newVisibility}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Share {project.name}</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Project Visibility</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current visibility: <span className="capitalize">{selectedVisibility}</span></p>
              <p className="text-gray-500 text-sm mt-1">
                {selectedVisibility === 'private' && 'Only you can access this project'}
                {selectedVisibility === 'team' && 'You and your team members can access this project'}
                {selectedVisibility === 'public' && 'Anyone with the link can access this project'}
              </p>
            </div>
            <button
              onClick={() => setDialogOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Change
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Share Link</h2>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-100 p-3 rounded-md flex items-center">
              <LinkIcon size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-600 text-sm overflow-hidden text-ellipsis">{shareableLink}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <Clipboard size={18} />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Invite Team Members</h2>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@example.com"
                className="w-full border border-gray-300 rounded-md p-2.5"
              />
            </div>
            <button
              onClick={handleInvite}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <Mail size={18} className="mr-2" />
              Invite
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-medium text-blue-600">YS</span>
              </div>
              <div>
                <p className="font-medium">You (Owner)</p>
                <p className="text-gray-500 text-sm">your.email@example.com</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Full Access</span>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Project Visibility</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div
              onClick={() => handleVisibilityChange('private')}
              className={`p-4 border rounded-md cursor-pointer ${selectedVisibility === 'private' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border ${selectedVisibility === 'private' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                  {selectedVisibility === 'private' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-medium">Private</h3>
                  <p className="text-sm text-gray-500">Only you can access this project</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleVisibilityChange('team')}
              className={`p-4 border rounded-md cursor-pointer ${selectedVisibility === 'team' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border ${selectedVisibility === 'team' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                  {selectedVisibility === 'team' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-medium">Team</h3>
                  <p className="text-sm text-gray-500">You and your team members can access this project</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleVisibilityChange('public')}
              className={`p-4 border rounded-md cursor-pointer ${selectedVisibility === 'public' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border ${selectedVisibility === 'public' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                  {selectedVisibility === 'public' && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-medium">Public</h3>
                  <p className="text-sm text-gray-500">Anyone with the link can access this project</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setDialogOpen(false)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
