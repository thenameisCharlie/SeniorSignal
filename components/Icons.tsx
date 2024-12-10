import { AntDesign, Feather } from "@expo/vector-icons";

interface IconProps {
    color?: string;
    size?: number;
}

export const icons = {
    index: (props: IconProps) => <AntDesign name="home" size={26} {...props} />,
    explore: (props: IconProps) => <Feather name="compass" size={26} {...props} />,
    create: (props: IconProps) => <AntDesign name="pluscircle" size={26} {...props} />,
    profile: (props: IconProps) => <AntDesign name="user" size={26} {...props} />,
};
