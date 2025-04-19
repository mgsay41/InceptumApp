import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featuredCardContainer}>
      <Image
        source={{ uri: item.Image }}
        style={styles.featuredCardImage}
        resizeMode="cover"
      />
      <Image
        source={images.cardGradient}
        style={styles.featuredCardGradient}
        resizeMode="cover"
      />
      <View style={styles.featuredCardRating}>
        <Image source={icons.star} style={styles.smallStarIcon} />
        <Text style={styles.ratingText}>{item.Rating}</Text>
      </View>
      <View style={styles.featuredCardContent}>
        <Text style={styles.featuredCardTitle} numberOfLines={1}>
          {item.Title}
        </Text>
        <Text style={styles.featuredCardSubtitle} numberOfLines={1}>
          {item.provider?.Name}
        </Text>
        <View style={styles.featuredCardPriceContainer}>
          <Text style={styles.featuredCardPrice}>{item.Fees} EGP</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.cardRating}>
        <Image source={icons.star} style={styles.tinyStarIcon} />
        <Text style={styles.smallRatingText}>{item.Rating}</Text>
      </View>
      <Image
        source={{ uri: item.Image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.Title}</Text>
        <Text style={styles.cardSubtitle}>{item.provider?.Name}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{item.Fees} EGP</Text>
          <Image
            source={icons.heart}
            style={styles.heartIcon}
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // FeaturedCard styles
  featuredCardContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 240, // w-60 equivalent
    height: 320, // h-80 equivalent
    position: "relative",
  },
  featuredCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16, // rounded-2xl equivalent
  },
  featuredCardGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16, // rounded-2xl equivalent
    position: "absolute",
    bottom: 0,
  },
  featuredCardRating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // white/90 equivalent
    paddingHorizontal: 12, // px-3 equivalent
    paddingVertical: 6, // py-1.5 equivalent
    borderRadius: 9999, // rounded-full equivalent
    position: "absolute",
    top: 20, // top-5 equivalent
    right: 20, // right-5 equivalent
  },
  smallStarIcon: {
    width: 14, // w-3.5 equivalent
    height: 14, // h-3.5 equivalent
  },
  ratingText: {
    fontSize: 12, // text-xs equivalent
    fontFamily: "Rubik",
    fontWeight: "bold",
    color: "#00C2A8", // Replace with your actual primary-300 color
    marginLeft: 4, // ml-1 equivalent
  },
  featuredCardContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "absolute",
    bottom: 20, // bottom-5 equivalent
    left: 20, // inset-x-5 left part
    right: 20, // inset-x-5 right part
  },
  featuredCardTitle: {
    fontSize: 20, // text-xl equivalent
    fontFamily: "Rubik",
    fontWeight: "800", // font-extrabold equivalent
    color: "white",
  },
  featuredCardSubtitle: {
    fontSize: 16, // text-base equivalent
    fontFamily: "Rubik",
    color: "white",
  },
  featuredCardPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  featuredCardPrice: {
    fontSize: 20, // text-xl equivalent
    fontFamily: "Rubik",
    fontWeight: "800", // font-extrabold equivalent
    color: "white",
  },

  // Card styles
  cardContainer: {
    flex: 1,
    width: "100%",
    marginTop: 16, // mt-4 equivalent
    paddingHorizontal: 12, // px-3 equivalent
    paddingVertical: 16, // py-4 equivalent
    borderRadius: 8, // rounded-lg equivalent
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.1)", // shadow-black-100/70 approximation
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    position: "relative",
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    paddingHorizontal: 8, // px-2 equivalent
    top: 20, // top-5 equivalent
    right: 20, // right-5 equivalent
    backgroundColor: "rgba(255, 255, 255, 0.9)", // bg-white/90 equivalent
    padding: 4, // p-1 equivalent
    borderRadius: 9999, // rounded-full equivalent
    zIndex: 50,
  },
  tinyStarIcon: {
    width: 10, // w-2.5 equivalent
    height: 10, // h-2.5 equivalent
  },
  smallRatingText: {
    fontSize: 12, // text-xs equivalent
    fontFamily: "Rubik",
    fontWeight: "bold",
    color: "#00C2A8", // Replace with your actual primary-300 color
    marginLeft: 2, // ml-0.5 equivalent
  },
  cardImage: {
    width: "100%",
    height: 160, // h-40 equivalent
    borderRadius: 8, // rounded-lg equivalent
  },
  cardContent: {
    flexDirection: "column",
    marginTop: 8, // mt-2 equivalent
  },
  cardTitle: {
    fontSize: 16, // text-base equivalent
    fontFamily: "Rubik",
    fontWeight: "bold",
    color: "#191D31", // Replace with your actual black-300 color
  },
  cardSubtitle: {
    fontSize: 12, // text-xs equivalent
    fontFamily: "Rubik",
    color: "#8C8E98", // Replace with your actual black-100 color
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8, // mt-2 equivalent
  },
  cardPrice: {
    fontSize: 16, // text-base equivalent
    fontFamily: "Rubik",
    fontWeight: "bold",
    color: "#00C2A8", // Replace with your actual primary-300 color
  },
  heartIcon: {
    width: 20, // w-5 equivalent
    height: 20, // h-5 equivalent
    marginRight: 8, // mr-2 equivalent
  },
});
