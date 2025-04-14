import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-lg my-10">Home</Text>
      <Link href="/SignIn">SignIn</Link>
      <Link href="/explore">explore</Link>
      <Link href="/Profile">profile</Link>
      <Link
        href={{
          pathname: "/Courses/[id]",
          params: { id: "8" },
        }}
      >
        Go to Course 9
      </Link>
    </View>
  );
}
