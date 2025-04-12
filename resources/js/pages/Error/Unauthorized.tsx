import React from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeftIcon } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Head>
        <title>403 Unauthorized</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="Access restricted due to insufficient permissions" />
      </Head>

      <Card className="w-full max-w-md p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl">
        <CardContent className="text-center space-y-6">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl font-black text-red-500 md:text-7xl">403</h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Access Denied
              </h2>
              <p className="text-gray-300">
                You don't have permission to view this page
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              The page you're trying to access requires higher privileges than
              your current account has. Please contact your system administrator
              if you believe this is an error.
            </p>

            <Button
              variant="secondary"
              className="w-full"
              asChild
            >
              <a href={route('dashboard')}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Return to Dashboard
              </a>
            </Button>
          </div>
        </CardContent>

        <CardFooter className="mt-6 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} muslichwr. All rights reserved.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;