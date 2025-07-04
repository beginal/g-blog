import { NextRequest } from 'next/server';
import { 
  withErrorHandler, 
  getSupabaseClient, 
  AuthHelper,
  createResponseWithHeaders,
  errorResponse,
  parseAndValidateBody 
} from '@/lib/api-utils';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { supabase, response } = getSupabaseClient(request);
  const authHelper = new AuthHelper(supabase);
  
  const session = await authHelper.getSession();

  return createResponseWithHeaders({ 
    authenticated: !!session,
    user: session?.user || null 
  }, response.headers);
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { supabase, response } = getSupabaseClient(request);
  const authHelper = new AuthHelper(supabase);
  const requestUrl = new URL(request.url);
  const action = requestUrl.searchParams.get('action');
  
  switch (action) {
    case 'logout': {
      const { error } = await authHelper.signOut();
      
      if (error) {
        return errorResponse(error.message, 500);
      }
      
      return createResponseWithHeaders({ success: true }, response.headers);
    }

    case 'login': {
      const { body, error } = await parseAndValidateBody(request, ['email', 'password']);
      if (error) return error;

      const { email, password } = body;
      const { data, error: signInError } = await authHelper.signIn(email, password);

      if (signInError) {
        return errorResponse(signInError.message, 401);
      }

      return createResponseWithHeaders({ 
        success: true,
        user: data.user 
      }, response.headers);
    }

    case 'signup': {
      const { body, error } = await parseAndValidateBody(request, ['email', 'password']);
      if (error) return error;

      const { email, password } = body;
      const { data, error: signUpError } = await authHelper.signUp(email, password);

      if (signUpError) {
        return errorResponse(signUpError.message, 400);
      }

      return createResponseWithHeaders({ 
        success: true,
        user: data.user,
        needsEmailVerification: data.user && !data.session 
      }, response.headers);
    }

    default:
      return errorResponse('Invalid action', 400);
  }
});