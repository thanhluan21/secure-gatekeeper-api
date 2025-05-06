
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw, ClipboardCopy, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { toast } from 'sonner';

const TokenInfoCard: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [expiryTime, setExpiryTime] = useState<number>(30 * 60); // Default 30 minutes in seconds
  const [remainingTime, setRemainingTime] = useState<number>(expiryTime);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchToken = () => {
      const currentToken = authService.getToken();
      setToken(currentToken);
      // Reset the timer when token is refreshed
      setRemainingTime(expiryTime);
    };

    fetchToken();
  }, [expiryTime]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [token]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const refreshToken = () => {
    // In a real app, this would call the API to refresh the token
    const newToken = `refreshed_mock_token_${Date.now()}`;
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setRemainingTime(expiryTime);
    toast.success('Token refreshed successfully');
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      toast.success('Token copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const progressPercent = (remainingTime / expiryTime) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>JWT Token</span>
          <div className="flex items-center text-sm font-normal">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className={remainingTime < 300 ? 'text-destructive' : 'text-muted-foreground'}>
              Expires in {formatTime(remainingTime)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <div
            className="h-2 bg-muted rounded-full"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ease-in-out ${
                progressPercent > 30 ? 'bg-primary' : 'bg-destructive'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-muted p-3 rounded-md relative overflow-hidden">
          <p className="text-xs font-mono truncate">
            {token || 'No token available'}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Copied
            </>
          ) : (
            <>
              <ClipboardCopy className="h-3.5 w-3.5 mr-1" />
              Copy Token
            </>
          )}
        </Button>
        <Button 
          size="sm" 
          className="text-xs" 
          onClick={refreshToken}
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Refresh Token
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenInfoCard;
