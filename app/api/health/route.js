import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const timestamp = new Date().toISOString();
    
    // Check environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      JWT_SECRET: process.env.JWT_SECRET ? 'loaded' : 'not set',
      MONGODB_URI: process.env.MONGODB_URI ? 'loaded' : 'not set',
      BUNNY_STORAGE_KEY: process.env.BUNNY_STORAGE_KEY ? 'loaded' : 'not set',
      BUNNY_STORAGE_URL: process.env.BUNNY_STORAGE_URL ? 'loaded' : 'not set',
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'loaded' : 'not set',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'not set'
    };

    // Check database connection
    let dbStatus = 'disconnected';
    try {
      if (mongoose.connection.readyState === 1) {
        dbStatus = 'connected';
      } else if (mongoose.connection.readyState === 2) {
        dbStatus = 'connecting';
      } else if (mongoose.connection.readyState === 3) {
        dbStatus = 'disconnecting';
      }
    } catch (error) {
      dbStatus = `error: ${error.message}`;
    }

    // Basic system info
    const systemInfo = {
      platform: process.platform,
      nodeVersion: process.version,
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      }
    };

    const healthData = {
      status: 'healthy',
      timestamp,
      environment: envCheck,
      database: {
        status: dbStatus,
        readyState: mongoose.connection.readyState
      },
      system: systemInfo,
      api: {
        version: '1.0.0',
        name: 'Poltic API'
      }
    };

    return NextResponse.json(healthData, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    const errorResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };

    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}