import {faBolt} from '@fortawesome/free-solid-svg-icons'
import {faTv} from '@fortawesome/free-solid-svg-icons'
import {faSitemap} from '@fortawesome/free-solid-svg-icons'
import {library} from "@fortawesome/fontawesome-svg-core"
import {faGauge} from "@fortawesome/free-solid-svg-icons";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";

export default function fontAwesomeLibrary() {
    library.add(faBolt)
    library.add(faTv)
    library.add(faSitemap)
    library.add(faGauge)
    library.add(faSignOut)

    return library
}