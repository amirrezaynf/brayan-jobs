import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://imocc.iracode.com/api/v1/expert-activity-fields';

// Handle GET requests
export async function GET(request) {
  try {
    console.log('🔄 Activity Fields Proxy: Handling GET request');
    
    const authorization = request.headers.get('authorization');
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    
    const apiUrl = searchParams ? `${API_BASE_URL}?${searchParams}` : API_BASE_URL;
    console.log('🌐 Activity Fields Proxy: Forwarding to:', apiUrl);
    
    const headers = {
      'Accept': 'application/json',
    };
    
    if (authorization) {
      headers['Authorization'] = authorization;
    }
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers,
    });
    
    console.log('📡 Activity Fields Proxy: API response status:', response.status);
    
    const responseText = await response.text();
    console.log('📡 Activity Fields Proxy: API response text:', responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { message: responseText };
    }
    
    return NextResponse.json(responseData, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
    
  } catch (error) {
    console.error('❌ Activity Fields Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy server error', details: error.message },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests (CORS preflight)
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
