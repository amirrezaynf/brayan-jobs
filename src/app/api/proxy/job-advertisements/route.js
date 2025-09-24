import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://imocc.iracode.com/api/v1/job-advertisements';

// Handle POST requests (Create vacancy)
export async function POST(request) {
  try {
    console.log('🔄 Proxy: Handling POST request to job-advertisements');
    
    // Get the request body
    const body = await request.json();
    console.log('📦 Proxy: Request body:', body);
    
    // Get authorization header from the request
    const authorization = request.headers.get('authorization');
    console.log('🔑 Proxy: Authorization header:', authorization ? 'Present' : 'Missing');
    
    if (!authorization) {
      return NextResponse.json(
        { error: 'Authorization header missing' },
        { status: 401 }
      );
    }
    
    // Forward the request to the actual API
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorization,
      },
      body: JSON.stringify(body),
    });
    
    console.log('📡 Proxy: API response status:', response.status);
    
    // Get the response text
    const responseText = await response.text();
    console.log('📡 Proxy: API response text:', responseText);
    
    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.log('❌ Proxy: Could not parse response as JSON');
      responseData = { message: responseText };
    }
    
    // Return the response with proper CORS headers
    return NextResponse.json(responseData, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
    
  } catch (error) {
    console.error('❌ Proxy error:', error);
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
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Handle GET requests (if needed)
export async function GET(request) {
  try {
    console.log('🔄 Proxy: Handling GET request to job-advertisements');
    
    const authorization = request.headers.get('authorization');
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    
    const apiUrl = searchParams ? `${API_BASE_URL}?${searchParams}` : API_BASE_URL;
    console.log('🌐 Proxy: Forwarding to:', apiUrl);
    
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
    
    const responseText = await response.text();
    
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
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
    
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy server error', details: error.message },
      { status: 500 }
    );
  }
}
