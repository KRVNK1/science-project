import { Link } from "@inertiajs/react"
import logoImg from "../../../public/img/Logo.png"

export default function Logo() {
    return (
        <Link href="/" className="flex items-center max-md:justify-center">
            <div className="text-blue-900">
                <img src={logoImg} alt="LOGO" />
            </div>
        </Link>
    )
}
