import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://imocc.iracode.com/api/v1/companies';

// Handle PUT requests (Create company - API requires PUT method)
export async function PUT(request) {
  try {
    console.log('🔄 Company Proxy: Handling PUT request to companies');
    
    // Get the request body
    const body = await request.json();
    console.log('📦 Company Proxy: Request body:', body);
    
    // Get authorization header from the request
    const authorization = request.headers.get('authorization');
    console.log('🔑 Company Proxy: Authorization header:', authorization ? 'Present' : 'Missing');
    
    if (!authorization) {
      return NextResponse.json(
        { error: 'Authorization header missing' },
        { status: 401 }
      );
    }
    
    // Forward the request to the actual API
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorization,
      },
      body: JSON.stringify(body),
    });
    
    console.log('📡 Company Proxy: API response status:', response.status);
    
    // Get the response text
    const responseText = await response.text();
    console.log('📡 Company Proxy: API response text:', responseText);
    
    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.log('❌ Company Proxy: Could not parse response as JSON');
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
    console.error('❌ Company Proxy error:', error);
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
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Handle GET requests
export async function GET(request) {
  try {
    console.log('🔄 Company Proxy: Handling GET request to companies');
    
    const authorization = request.headers.get('authorization');
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    
    const apiUrl = searchParams ? `${API_BASE_URL}?${searchParams}` : API_BASE_URL;
    console.log('🌐 Company Proxy: Forwarding to:', apiUrl);
    
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
    console.error('❌ Company Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy server error', details: error.message },
      { status: 500 }
    );
  }
}
