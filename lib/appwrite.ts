import {
  Client,
  Account,
  Avatars,
  OAuthProvider,
  Databases,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.inceptum.app",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  studentCollectionId: process.env.EXPO_PUBLIC_APPWRITE_STUDENT_COLLECTION_ID,
  courseCollectionId: process.env.EXPO_PUBLIC_APPWRITE_COURSES_COLLECTION_ID,
  providerCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROVIDER_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectID!)
  .setPlatform(config.platform!);

export const account = new Account(client);
export const avatar = new Avatars(client);
export const database = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Failed to initiate OAuth login");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success" || !browserResult.url) {
      throw new Error("Failed to complete OAuth login");
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId)
      throw new Error("Failed to retrieve login credentials");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create a session");

    const user = await account.get(); // <== ADD THIS
    console.log("User authenticated:", user);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    console.log("Deleting current session...");
    await account.deleteSession("current");
    console.log("Session deleted successfully.");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFeaturedCourses() {
  try {
    const result = await database.listDocuments(
      config.courseCollectionId!,
      config.databaseId!,
      [Query.orderAsc("createdAt"), Query.limit(5)]
    );
    return result.documents;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCourses({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("createdAt")];

    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("Category", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("Title", query),
          Query.search("Type", query),
          Query.search("Location", query),
          Query.search("About", query),
          Query.search("Category", query),
        ])
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await database.listDocuments(
      config.courseCollectionId!,
      config.databaseId!,
      buildQuery
    );
    return result.documents;
  } catch (error) {
    console.error(error);
    return null;
  }
}
