# Brian Jobs - Vacancy API Integration Documentation

## Overview

This document outlines the comprehensive updates made to the Brian Jobs vacancy management system to fully integrate with the backend API. The implementation resolves previous issues with vacancy creation and provides a robust, production-ready solution.

## Files Updated

### 1. `/src/app/actions/vacancy.js` - **Primary Vacancy Management**
**Purpose**: Handles creating, updating, and deleting job vacancies

**Key Features**:
- ✅ **Correct API Base URL**: `https://imocc.iracode.com/api/v1/job-advertisements`
- ✅ **Data Transformation**: Complete `transformFormDataToAPI()` function
- ✅ **Company Integration**: Automatic company_id retrieval from localStorage
- ✅ **Error Handling**: Status-specific Persian error messages
- ✅ **HTTP Methods**: POST for creation, PUT/PATCH for updates

### 2. `/src/app/actions/job-advertisements.js` - **Vacancy Fetching**
**Purpose**: Handles reading and searching job advertisements

**Key Features**:
- ✅ **Fixed URL Construction**: Removed duplicate path segments
- ✅ **Updated Experience Levels**: Added "5-10" and "10+" levels
- ✅ **Security**: Input validation and sanitization
- ✅ **Fallback Data**: Sample data for development/testing

### 3. `/src/app/actions/advertisements.js` - **Alternative Fetching**
**Purpose**: Alternative implementation for fetching advertisements

**Key Features**:
- ✅ **Updated Experience Levels**: Consistent with other files
- ✅ **Environment Configuration**: Uses NEXT_PUBLIC_API_BASE_URL
- ✅ **Security**: Comprehensive input validation

### 4. `/src/components/debug/VacancyAPITester.jsx` - **Testing Component**
**Purpose**: Testing and debugging tool for vacancy API integration

**Key Features**:
- ✅ **Company ID Management**: Check and set company IDs
- ✅ **API Testing**: Test vacancy creation with sample data
- ✅ **Error Display**: Detailed error reporting
- ✅ **Instructions**: User-friendly testing guide

## Data Transformation Mappings

### Contract Types (Persian → English)
```javascript
"تمام وقت" → "full-time"
"پاره وقت" → "part-time"
"قراردادی" → "contract"
"کارآموزی" → "internship"
"فریلنسر" → "freelance"
```

### Experience Levels (Persian → English)
```javascript
"تازه‌کار" → "fresh"
"۱ تا ۲ سال" → "1-2"
"۲ تا ۵ سال" → "2-5"
"۵ تا ۱۰ سال" → "5-10"
"بیش از ۱۰ سال" → "10+"
```

### Education Levels (Persian → English)
```javascript
"دیپلم" → "diploma"
"کاردانی" → "associate"
"کارشناسی" → "bachelor"
"کارشناسی ارشد" → "master"
"دکتری" → "phd"
```

### Gender Preferences (Persian → English)
```javascript
"هر دو" → "both"
"مرد" → "male"
"زن" → "female"
```

### Military Service Status (Persian → English)
```javascript
"پایان خدمت" → "completed"
"معافیت" → "exempt"
"در حال انجام" → "in_progress"
```

## API Endpoints

### Create Vacancy
- **Method**: POST
- **URL**: `https://imocc.iracode.com/api/v1/job-advertisements`
- **Authentication**: Bearer token from cookies
- **Data**: Transformed form data to API format

### Update Vacancy
- **Method**: PUT (primary), PATCH (fallback)
- **URL**: `https://imocc.iracode.com/api/v1/job-advertisements/{id}`
- **Authentication**: Bearer token from cookies
- **Data**: Transformed form data to API format

### Get Vacancies
- **Method**: GET
- **URL**: `https://imocc.iracode.com/api/v1/job-advertisements`
- **Parameters**: search, company_id, contract_type, experience_level, etc.

### Get Single Vacancy
- **Method**: GET
- **URL**: `https://imocc.iracode.com/api/v1/job-advertisements/{id}`

## Error Handling

### Status Code Responses

| Status | Persian Message | Description |
|--------|----------------|-------------|
| 400 | "ابتدا باید پروفایل شرکت خود را تکمیل کنید" | Company not associated |
| 400 | "داده‌های ارسالی نامعتبر است" | Invalid data |
| 401 | "لطفاً مجدداً وارد شوید" | Authentication required |
| 403 | "شما مجوز ایجاد آگهی ندارید" | Permission denied |
| 404 | "آگهی مورد نظر یافت نشد" | Vacancy not found |
| 422 | Detailed validation errors | Field validation errors |
| 429 | "تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید" | Rate limiting |

## Key Features

### 1. **Company Association**
- Automatically retrieves `company_id` from localStorage
- Includes company association in all API requests
- Handles cases where company_id is not available

### 2. **Data Validation**
- Removes null/empty fields before API submission
- Validates and transforms all form data
- Ensures API compliance

### 3. **Automatic Features**
- **Expiration Date**: Automatically set to 30 days from creation
- **Activity Field Mapping**: Maps job categories to activity field IDs
- **Boolean Handling**: Proper handling of remote work, urgent, travel flags

### 4. **Fallback Mechanisms**
- PUT → PATCH fallback for updates
- Sample data fallback for development
- Graceful error handling

## Testing

### Using VacancyAPITester Component

1. **Check Company ID**: Verify if company_id exists in localStorage
2. **Set Test Company ID**: Use test ID (999) for development
3. **Test Creation**: Create a sample vacancy with test data
4. **Review Results**: Check console logs and response data

### Sample Test Data
```javascript
{
  company: "شرکت تست",
  title: "برنامه‌نویس React",
  category: "فناوری اطلاعات",
  type: "تمام وقت",
  salary: "15000000",
  location: "تهران، ایران",
  // ... additional fields
}
```

## Common Issues & Solutions

### Issue: "کاربر به هیچ شرکتی متصل نیست"
**Solution**: User must create/complete company profile first

### Issue: Validation errors (422)
**Solution**: Check data transformation and field mappings

### Issue: Authentication errors (401)
**Solution**: Verify auth token in cookies

### Issue: Permission errors (403)
**Solution**: Ensure user has employer role

## Development Notes

### Environment Variables
- `NEXT_PUBLIC_API_BASE_URL`: API base URL (optional)
- `NODE_ENV`: Development/production mode

### Dependencies
- Next.js server actions
- Cookie handling for authentication
- localStorage for company_id storage

### Security Considerations
- Input validation and sanitization
- No sensitive data in client-side code
- Proper authentication handling
- Rate limiting awareness

## Future Enhancements

1. **Caching**: Implement response caching for better performance
2. **Offline Support**: Add offline capability with local storage
3. **Real-time Updates**: WebSocket integration for live updates
4. **Advanced Filtering**: More sophisticated search and filter options
5. **Analytics**: Track vacancy performance and metrics

## Conclusion

The vacancy API integration is now complete and production-ready. The system provides:

- ✅ **Full API Compliance**: Matches backend API requirements exactly
- ✅ **Robust Error Handling**: User-friendly Persian error messages
- ✅ **Data Integrity**: Proper validation and transformation
- ✅ **Company Integration**: Seamless company association
- ✅ **Testing Tools**: Comprehensive debugging capabilities

The implementation resolves all previous issues and provides a solid foundation for the Brian Jobs vacancy management system.
