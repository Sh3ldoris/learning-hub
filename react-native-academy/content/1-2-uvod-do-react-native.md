# Úvod do React Native

## 1. Čo je React Native?

React Native je open-source multiplatformový framework vyvinutý spoločnosťou Meta (vtedy Facebook), ktorý umožňuje vývoj natívnych mobilných aplikácií pre iOS a Android pomocou JavaScriptu/TypeScriptu a **deklaratívneho princípu Reactu**.

Minule sme si hovorili, že výstupom Reactu je webová aplikácia renderujúca HTML elementy. React Native naproti tomu nerenderuje aplikáciu vo vnútri webového prehliadača (WebView). 

React Native generuje **natívne UI komponenty** daného operačného systému (napr. `UIView` na iOS, `android.view.View` na Androide).

Je dôležité si tiež uvedomovať, že výstupom React Native projektu tak nie je webová stránka, ale natívna mobilná aplikácia. Pri iOS je výsledkom kompilácie štandardný **`.ipa`** súbor (*iOS App Store Package*). Pre Android je to **`.aab`** (*Android App Bundle* pre Google Play) alebo inštalačný **`.apk`** súbor (*Android Package*, zvyčajne sa používa len pri vývoji a testovaní).

Vydávanie a distribúcia aplikácií prebieha úplne rovnako ako pri aplikáciách napísaných v čistom Swifte alebo Kotline:
1. **Apple App Store:** Aplikácia sa nahráva cez *App Store Connect* (alebo Xcode / EAS Submit), prechádza štandardným schvaľovacím procesom Applu (*App Review*) a distribuuje sa používateľom cez App Store (alebo beta testerom cez *TestFlight*).
2. **Google Play Store:** Aplikácia sa nahráva do *Google Play Console*, overuje sa podľa pravidiel Google Play a publikuje sa do produkcie či interných testovacích trackov.

Pre bežného používateľa, ktorý si aplikáciu stiahne z obchodu, neexistuje žiadny viditeľný rozdiel medzi React Native aplikáciou a „čisto natívnou“ aplikáciou – inštaluje sa z obchodu, má svoju ikonu, spúšťa sa natívne a má prístup ku všetkým hardvérovým možnostiam zariadenia.

### História: Prečo a ako React Native vznikol?

V časoch masového prechodu používateľov z desktopových počítačov na smartfóny sa Facebook rozhodol staviť na HTML5 a mobilný web obalený v natívnom wrapperi (WebView).

Výsledok bol však katastrofálny:
- Aplikácia bola pomalá, sekala pri scrollovaní a načítavaní feedu.
- Webové animácie na vtedajších mobilných procesoroch neboli plynulé.
- Správa pamäte a nestabilita viedli k častým pádom aplikácie.
- Používateľský zážitok (UX) vôbec nepôsobil ako v skutočnej natívnej aplikácii.

Vo Facebooku si ale uvedomili, alebo lepšie povedané akceptovali fakt, že webové a mobilné prostredia sú dva odlíšne svety. Následne prepísali svoje mobilné aplikácie do čistého natívneho kódu (Objective-C pre iOS a Java pre Android). Tým síce dosiahli plynulosť a natívny výkon, no narazili na iný problém, ktorý natívny mobilný vývoj prináša - dva oddelené tímy, dva úplne odlišné codebase-y, dvojnásobné náklady na vývoj a pomalý cyklus nasadzovania zmien (čakanie na kompiláciu a schvaľovací proces v App Store/Google Play).

Tu sa dostávame k otázke: „Prečo teda vznikol React Native?“ Už v tej dobe predsa existovali multiplatformové nástroje (napr. Titanium či Xamarin), ktoré sa snažili riešiť vysoké náklady natívneho vývoja aj výkonnostné limity webu. Odpoveďou je, že všetky vtedajšie riešenia sa stále držali imperatívneho prístupu. 

Inžinieri z Facebooku chceli na mobilné platformy preniesť ich revolučnú paradigmu overenú na webe – **deklaratívne UI, komponentový model a automatickú rekonciliáciu**. Zorganizovali preto interný hackathon, kde padla zásadná otázka: 
*Čo keby sme vzali deklaratívny model a vývojársku produktivitu Reactu, ale namiesto HTML DOM-u by sme manipulovali priamo natívne UI komponenty telefónu?*

Výsledkom bol interný prototyp, ktorý Facebook najprv nasadil na iOS aplikáciu Facebook Groups a Facebook Ads Manager. V marci **2015** na konferencii F8 bol React Native oficiálne vydaný ako open-source.

React Native však netvrdí, že jedna a tá istá obrazovka musí bez akejkoľvek úpravy vyzerať pixelovo identicky na Androide, iOS aj webe. Každá platforma má svoje špecifiká (spôsob navigácie, dizajn manuály ako Material You na Androide vs. Human Interface Guidelines na iOS, gestá, tlačidlo späť, atď.). Filozofiou React Native je umožniť vývojárovi používať rovnaké mentálne modely (React, komponenty, stav, props, hooks), no s plným rešpektom k natívnemu správaniu cieľovej platformy.

### React vs React Native

Hoci oba používajú rovnaké jadro Reactu (JSX, komponenty, hooks ako `useState`, `useEffect`), prostredie, v ktorom bežia, je radikálne odlišné.

| Vlastnosť | React (Web / ReactDOM) | React Native |
| :--- | :--- | :--- |
| **Cieľové prostredie** | Webový prehliadač (DOM) | Mobilný OS (iOS / Android natívne views) |
| **Základné UI elementy** | `<div>`, `<span>`, `<p>`, `<img>`, `<input>` | `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>` |
| **Manipulácia s UI** | Real DOM API (`document.createElement`) | Natívne volania OS (`UIView`, `android.view.View`) |
| **Štýlovanie** | CSS, Tailwind | JavaScript `StyleSheet` objekt + **Yoga** (Flexbox engine) |
| **Interakcie používateľa** | `onClick`, `onMouseEnter`, `onKeyDown` | `onPress`, `onLongPress`, Gesture Handler API |
| **Špecifické API platformy** | Web API (`window`, `localStorage`, `fetch`) | Natívne API (`Camera`, `Geolocation`, `AsyncStorage`, `Haptics`) |
| **Kompilácia / Balíčkovanie** | Webpack, Vite, Rollup | **Metro Bundler** + **Hermes Engine** |
| **Výstup & Distribúcia** | Statické súbory (HTML, CSS, JS) na webovom serveri | Natívne balíčky (**`.ipa`**, **`.aab`** / **`.apk`**) cez App Store & Google Play |

#### Porovnanie syntaxe na jednoduchom komponente

**React (Web):**
```tsx
import './UserProfile.css';

interface UserProfileProps {
  name: string;
  avatarUrl: string;
}

export function UserProfile({ name, avatarUrl }: UserProfileProps) {
  return (
    <div className="card" onClick={() => console.log('Pressed!')}>
      <img src={avatarUrl} alt={name} className="avatar" />
      <span className="name">{name}</span>
    </div>
  );
}
```

```css
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 8px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 12px;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}
```

**React Native:**
```tsx
import { Pressable, Image, Text, StyleSheet } from 'react-native';

interface UserProfileProps {
  name: string;
  avatarUrl: string;
}

export function UserProfile({ name, avatarUrl }: UserProfileProps) {
  return (
    <Pressable style={styles.card} onPress={() => console.log('Pressed!')}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});
```

---

> Zdroje k tejto sekcii:
> - https://reactnative.dev/docs/getting-started
> - https://reactnative.dev/docs/intro-react-native-components
> - https://techcrunch.com/2012/09/11/mark-zuckerberg-our-biggest-mistake-with-mobile-was-betting-too-much-on-html5/

---

## 2. Ako funguje React Native pod povrchom?

Aby sme boli dobrými mobilnými vývojármi, musíme rozumieť tomu, ako sa náš JavaScriptový kód dostane na obrazovku telefónu a premení na reálne pixely.

V histórii React Native existujú **dve éry architektúry**:
1. **Stará architektúra (Legacy Architecture)** – založená na asynchrónnom *Bridge* (používaná od začiatku do cca 2022).
2. **Nová architektúra (New Architecture)** – založená na *JSI*, *Fabric Renderer*, *TurboModules* a *Hermes* (predvolená v moderných verziách RN).

Poďme si ich postupne rozobrať.

### Éra 1: Stará architektúra a "The Bridge"

V starej architektúre bežala aplikácia v troch paralelných oddelených svetoch (vláknach):

```
┌─────────────────────────────────────────────────────────────┐
│                 1. JavaScript Thread                        │
│   (V8 / JavaScriptCore: React kód, business logika, state)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼  [JSON serializácia]
┌─────────────────────────────────────────────────────────────┐
│                     THE ASYNC BRIDGE                        │
│   (Asynchrónny kanál prenášajúci reťazce správ v JSON)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼  [JSON deserializácia]
┌──────────────────────────────┴──────────────────────────────┐
│  2. Shadow Thread (Layout)   │    3. Main / UI Thread       │
│  - Yoga (Flexbox výpočty)    │    - UIKit (iOS) / View (And)│
│  - Generovanie rozmerov      │    - Kreslenie pixelov a dotyk│
└──────────────────────────────┴──────────────────────────────┘
```

#### Ako fungoval Bridge?
JavaScript vlákno nikdy nevolalo priamo natívny kód (Objective-C / Java / Swift / Kotlin). Všetka komunikácia prebiehala tak, že JavaScript zoserializoval volania do **JSON stringu**, poslal ich cez **Bridge**, na druhej strane sa JSON rozparsoval a natívny kód vykonal príkaz.

#### Prečo Bridge narazil na limity?
1. **Asynchrónnosť:** Každá správa musela ísť cez frontu. Ak používateľ rýchlo scrolloval zoznamom (`FlatList`), JavaScript nestíhal posielať požiadavky na vykreslenie nových položiek včas, čo spôsobovalo známe biele prázdne miesta počas scrollovania.
2. **Cena serializácie:** Neustále prevádzanie dát `Objekt -> JSON String -> Natívny Objekt` zaťažovalo procesor a pamäť.
3. **Pomalý štart (Startup time):** Všetky natívne moduly sa museli zaregistrovať a inicializovať hneď pri štarte aplikácie, aj keď ich používateľ nikdy nepoužil.

### Éra 2: Nová architektúra (Modern React Native)

Aby Meta tieto problémy natrvalo vyriešila, navrhla úplne novú architektúru od základov. Nová architektúra pozostáva zo štyroch hlavných pilierov:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          JavaScript / TypeScript                        │
│                      (React 18/19, Hooks, Components)                   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 │                  JSI                  │
                 │         (JavaScript Interface)        │
                 └───────────────────┬───────────────────┘
                                     │ (Priame synchrónne C++ volania)
            ┌────────────────────────┴────────────────────────┐
            ▼                                                 ▼
┌───────────────────────┐                         ┌───────────────────────┐
│    Fabric Renderer    │                         │     TurboModules      │
│  - C++ Shadow Tree    │                         │  - Typovo bezpečné    │
│  - Yoga Layout engine │                         │  - Lazy-loaded natívne│
│  - Synchrónne meranie │                         │    moduly (Bluetooth, │
│  - Concurrent React   │                         │    Kamera, Úložisko)  │
└───────────┬───────────┘                         └───────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Host Platform Views                              │
│                    (iOS: UIView | Android: View)                        │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 1. JSI (JavaScript Interface)
JSI je odľahčená vrstva napísaná v C++, ktorá nahrádza starý Bridge. Vďaka JSI môže JavaScript držať priamu referenciu na C++ objekty (tzv. *Host Objects*) a volať ich metódy **priamo a synchrónne bez akejkoľvek JSON serializácie**. Rovnako môže C++ priamo volať JavaScript.

#### 2. Hermes JavaScript Engine
Hermes je open-source JavaScriptový engine vyvinutý priamo pre React Native.
* **Pre-kompilácia do Bytecode (AOT):** Na rozdiel od V8 v prehliadači, Hermes nespracováva zdrojový JS kód až v telefóne pomocou JIT. Kód sa skompiluje do optimalizovaného bytekódu už počas buildu aplikácie na vašom počítači.
* **Bleskový štart (Time To Interactive - TTI):** Telefón nemusí po zapnutí parsovať megabajty textového JavaScriptu.
* **Nízka spotreba pamäte (RAM).**

#### 3. Fabric Renderer
Fabric je moderný vykresľovací systém React Native:
* Využíva **C++ Shadow Tree**: Strom uzlov vytvorený z React elementov je spravovaný v C++, čo umožňuje zdieľať rovnakú logiku rozloženia medzi iOS a Androidom.
* **Yoga Engine:** Flexbox layout engine napísaný v C++, ktorý počíta presné súradnice a rozmery elementov.
* **Synchrónne vykresľovanie:** Umožňuje okamžitú reakciu na gestá používateľa a odstraňuje preblikávanie pri rýchlom scrollovaní.
* **Podpora Concurrent React:** Umožňuje využívať React funkcie ako `Transitions`, `Suspense` a prioritizované vykresľovanie.

#### 4. TurboModules
Nová generácia natívnych modulov (prístup k hardvéru: kamera, biometria, akcelerometer, GPS).
* Na rozdiel od starej architektúry sa moduly inicializujú **lazy (až vo chvíli, keď ich v kóde prvýkrát zavoláte)**, čím sa rapídne zrýchľuje štart aplikácie.
* Sú prísne typovo bezpečné vďaka generovaniu rozhraní cez Codegen.

---

> Zdroje k tejto sekcii:
> - https://reactnative.dev/docs/the-new-architecture/landing-page
> - https://reactnative.dev/docs/hermes
> - https://github.com/react-native-community/discussions-and-proposals/

---

## 3. Render, commit and mount (Render Pipeline)

Aby sa komponenty a stav z Reactu zobrazili ako reálne pixely na obrazovke, React Native renderer prechádza postupnosťou krokov, ktorá sa nazýva **render pipeline** (vykresľovací reťazec). Tento proces prebieha rovnako pri počiatočnom vykreslení (**Initial Render**), ako aj pri následných aktualizáciách používateľského rozhrania (**UI State Updates**).

Celý reťazec je rozdelený do **troch hlavných fáz**:

```
┌─────────────────────────────────┐
│        1. FÁZA: RENDER          │  JavaScript / C++
│  - Redukcia React elementov     │  (vykonáva React logiku, vytvára
│  - Vytvorenie React Shadow Tree │   stromy uzlov v JS a C++)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│        2. FÁZA: COMMIT          │  Background Thread / C++
│  - Layout Calculation (Yoga)    │  (vypočíta rozmery a pozície,
│  - Tree Promotion (Next Tree)   │   povýši strom pre montovanie)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│        3. FÁZA: MOUNT           │  UI Thread (Main)
│  - Tree Diffing & Flattening    │  (porovná stromy, aplikuje zmeny
│  - Tvorba Host Views (UIKit/And)│   na reálne natívne zobrazenia)
└─────────────────────────────────┘
```

> **Poznámka o vláknach:** Tieto tri fázy môžu prebiehať na odlišných vláknach – napríklad render fáza na JS vlákne, commit na vlákne na pozadí a mount na natívnom UI vlákne.

### 1. Fáza: Render

V tejto fáze React vykonáva aplikačnú logiku a vytvára stromovú štruktúru elementov:
1. **Redukcia elementov (Element Reduction):** React postupne rekurzívne rozbaľuje vlastné komponenty (napr. `<MyComponent />`), až kým nezostanú iba základné terminálne komponenty (*React Host Components*, ako napr. `<View>` alebo `<Text>`). Vzniká tak **React Element Tree** v JavaScripte.
2. **Vytvorenie tieňového stromu (React Shadow Tree):** Pre každý *React Host Component* renderer synchrónne vytvorí zodpovedajúci **React Shadow Node** v C++ (napr. pre `<View>` vznikne `ViewShadowNode`, pre `<Text>` vznikne `TextShadowNode`). Pre kompozitné (vlastné) komponenty sa tieňové uzly nevytvárajú. Z týchto uzlov sa zostaví **React Shadow Tree**.
3. **Prepojenie cez JSI:** React vlákna (*fibers*) reprezentujúce hostiteľské komponenty držia priame C++ ukazovatele na príslušné *React Shadow Nodes*.
4. **Nemeniteľnosť (Immutability):** *React Shadow Tree* je prísne nemenný. Uzly sa nedajú priamo modifikovať – akákoľvek zmena si vyžaduje vytvorenie novej verzie stromu.

### 2. Fáza: Commit

Po tom, čo je *React Shadow Tree* kompletne vytvorený, renderer spustí fázu commitu (zvyčajne beží asynchrónne na vlákne na pozadí). Pozostáva z dvoch operácií:

1. **Výpočet rozloženia (Layout Calculation):**
   - Spustí sa flexbox layout engine **Yoga** napísaný v C++.
   - Na základe štýlov zadaných v JavaScripte a priestorových obmedzení koreňa stromu (*root layout constraints*) vypočíta presné rozmery a súradnice každého tieňového uzla.
   - Väčšina výpočtov prebieha čisto v C++. Výnimkou sú komponenty závislé od špecifík cieľovej platformy (napr. text v `<Text>` a `<TextInput>`), kde Yoga zavolá kód hostiteľskej platformy, aby zohľadnila natívne písma a metriky systému.
2. **Povýšenie stromu (Tree Promotion: New Tree → Next Tree):**
   - Novovytvorený tieňový strom s vypočítaným rozložením sa označí ako **„nasledujúci strom“ (*Next Tree*)**.
   - To signalizuje, že strom má všetky informácie potrebné na montovanie a reprezentuje najnovší stav rozhrania pripravený pre najbližší takt UI vlákna.

### 3. Fáza: Mount

Vo fáze montovania sa *React Shadow Tree* (obohatený o vypočítané rozmery) transformuje na skutočné natívne zobrazenia na obrazovke (**Host View Tree**, napr. `UIView` na iOS alebo `ViewGroup` / `TextView` na Androide):

1. **Porovnanie stromov (Tree Diffing):**
   - Prebieha kompletne v C++. Vypočíta sa rozdiel medzi naposledy vykresleným stromom (*Previously Rendered Tree*) a novým stromom (*Next Tree*).
   - Výsledkom je zoznam atomických mutácií (napr. `createView`, `updateView`, `removeView`, `deleteView`).
   - Súčasťou tohto kroku je aj **View Flattening** (sploštenie stromu) – optimalizácia, ktorá eliminuje zbytočné natívne zobrazenia slúžiace iba na layout bez vlastného vizuálneho štýlu (v reálnych aplikáciách typicky redukuje strom z 600–1000 uzlov na ~200, čo výrazne šetrí pamäť aj procesor).
2. **Povýšenie stromu (Next Tree → Rendered Tree):**
   - Nový strom sa atomicky povýši na aktuálne vykreslený strom (*Rendered Tree*), aby sa pri ďalšej aktualizácii počítal diff voči nemu.
3. **Namontovanie zobrazení (View Mounting):**
   - Vygenerované atomické mutácie sa aplikujú priamo na **UI vlákne (Main Thread)** hostiteľskej platformy, kde sa natívne komponenty reálne vykreslia na displej. (Pri prvotnom vykreslení je predchádzajúci strom prázdny, takže operácie pozostávajú výhradne z vytvárania a skladania zobrazení).

### Aktualizácie stavu (React State Updates) a štrukturálne zdieľanie

Čo sa udeje, ak v aplikácii nastane zmena stavu (napr. po interakcii používateľa sa zmení farba prvku)?

Pretože tieňový strom je kvôli bezpečnosti pri práci s vláknami **nemenný (immutable)**, React nemôže existujúci strom priamo prepísať. Namiesto vytvárania celej kópie od nuly využíva **štrukturálne zdieľanie (Structural Sharing)**:
* React naklonuje iba tie uzly, ktorých vlastnosti, štýly alebo potomkovia sa zmenili, a uzly na ceste nahor ku koreňu.
* Všetky ostatné nezmenené podstromy sú **zdieľané** medzi starým a novým stromom.
* Počas fázy **Commit** sa prepočíta rozloženie (ak sa zmení layout rodiča, môže prebehnúť klonovanie ovplyvnených potomkov).
* Počas fázy **Mount** porovnanie (*Tree Diffing*) identifikuje len minimálny nutný rozsah zmien (napr. jedno volanie `updateView` pre zmenu farby pozadia) a UI vlákno upraví iba dané natívne zobrazenie bez zbytočného prekresľovania zvyšku obrazovky.

### Aktualizácie stavu na strane C++ (C++ State Updates)

Vo väčšine prípadov je jediným zdrojom pravdy JavaScriptový kód Reactu. Existujú však situácie, kedy stav vzniká priamo na úrovni natívnej platformy a C++ a JavaScript nie je jeho zdrojom pravdy (napr. zmena pozície scrollovania v `ScrollView`, potrebná pre metódy ako `measure`).

* Tieto aktualizácie **úplne preskakujú fázu Render**, pretože do nich React vôbec nevstupuje.
* Môžu vznikať na ľubovoľnom vlákne (vrátane UI vlákna).
* Počas commitu sa naklonuje tieňový uzol s novým C++ stavom. Ak by v tom istom čase prebehol iný commit z Reactu, mechanizmus aktualizáciu zopakuje (retry mechanizmus), kým úspešne neprebehne, čím sa predchádza konfliktom (race conditions) pri zdroji pravdy.
* Fáza Mount následne prebieha prakticky rovnako ako pri bežnej aktualizácii stavu.

---

> Zdroje k tejto sekcii:
> - https://reactnative.dev/architecture/render-pipeline

---

## 4. Výkon a snímková frekvencia

Zásadným dôvodom, prečo používať React Native namiesto nástrojov založených na WebView, je dosiahnutie plynulého behu na úrovni **aspoň 60 snímok za sekundu (FPS)** a zabezpečenie natívneho vzhľadu i pocitu z aplikácie. Pokiaľ je to možné, cieľom React Native je spracovávať optimalizácie automaticky, vďaka čomu sa vývojári môžu plne sústrediť na samotnú aplikáciu bez nutnosti neustále riešiť výkon. Existujú však oblasti, kde framework túto úroveň zatiaľ úplne nedosiahol, ako aj situácie, v ktorých React Native (podobne ako pri priamom písaní natívneho kódu) nedokáže sám určiť najvhodnejší prístup k optimalizácii. V takýchto prípadoch sa stáva nevyhnutným manuálny zásah vývojára. Hoci sa React Native predvolene usiluje poskytovať dokonale plynulý chod používateľského rozhrania, môžu nastať momenty, kedy to automaticky nie je možné.

### Prečo záleží na snímkach (Frames)?

Pohyb na displeji mobilného zariadenia je ilúzia vytvorená rýchlym striedaním statických obrazov – **snímok (frames)**. Moderné iOS a Android zariadenia štandardne zobrazujú **minimálne 60 snímok za sekundu**. To znamená, že React Native a operačný systém majú na vygenerovanie každej jednej snímky časové okno maximálne **16,67 ms** (1 sekunda / 60 ≈ 16,67 ms). Ak aplikácia alebo systém nestihne vykonať všetku potrebnú prácu v tomto časovom limite, dôjde k **zahodeniu snímky (*dropped frame*)** – používateľské rozhranie trhne, animácia sekne a aplikácia začne pôsobiť zaseknuto a nereagujúco.

Keď v aplikácii otvoríte vývojárske menu a zapnete možnosť **Show Perf Monitor**, zistíte, že React Native rozlišuje a meria dve samostatné snímkové frekvencie:

1. **JS frame rate (JavaScriptové vlákno)**
2. **UI frame rate (UI / Hlavné vlákno)**


#### 1. JavaScript thread

Na JavaScriptovom vlákne beží prevažná väčšina aplikačnej a biznis logiky:
* Vykonáva sa React kód, volajú sa API endpointy, spracúvajú sa udalosti a riadi sa stav komponentov.
* Aktualizácie pre natívne zobrazenia sa zoskupujú (*batching*) a posielajú natívnej strane na konci každej iterácie event loopu ešte pred termínom ďalšej snímky.
* **Čo spôsobí prepadnutie snímok na JS?**
  * Ak napríklad na koreňovom komponente nastavíte nový stav, ktorý vyvolá výpočtovo náročný re-render veľkého podstromu trvajúci napr. 200 ms, prepadne sa približne 12 snímok (200 ms / 16,67 ms). Všetky animácie riadené JavaScriptom v tom čase vizuálne zamrznú.
* **Oneskorená reakcia na dotyk:** Ak je JS vlákno zaneprázdnené naprieč viacerými snímkami, prejaví sa to citeľným oneskorením napríklad pri komponente `TouchableOpacity`. JavaScriptové vlákno je zaneprázdnené a nestíha včas spracovať surové dotykové udalosti z hlavného vlákna a vydať natívnemu zobrazeniu pokyn na zmenu priehľadnosti (*opacity*).

#### 2. Main thread

UI vlákno je hlavné natívne vlákno aplikácie na úrovni iOS/Androidu, ktoré zodpovedá za vykresľovanie pixelov a riadenie natívnych zobrazení:
* **Prechodové animácie obrazoviek:** Natívne stack navigátory (ako napr. `@react-navigation/native-stack`) fungujú výrazne plynulejšie než čisto JavaScriptové navigátory, pretože ich prechody bežia priamo na natívnom UI vlákne – a teda nie sú prerušované prepadmi snímok na JS vlákne.
* **Nezávislé scrollovanie (`ScrollView`):** V komponente `ScrollView` môžete plynulo posúvať obsah hore a dole aj v momente, keď je JavaScriptové vlákno úplne zaseknuté alebo preťažené. `ScrollView` totiž žije a beží na hlavnom natívnom vlákne. Udalosti o posune sa síce odosielajú na JS vlákno, no ich prijatie a spracovanie v JavaScripte nie je potrebné na to, aby fyzický scroll na obrazovke prebehol.

---

> Zdroje k tejto sekcii:
> - https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames

---

## 5. React Native & Expo

Keď začíname nový projekt v React Native, máme dva spôsoby akými možeme vytvárať a spravovať natívny kód našej aplikácie: tradičný „Bare“ React Native a moderný Expo Framework.

#### „Bare“ React Native (Community CLI)

„Bare“ projekt predstavuje tradičný prístup, kedy čistý React Native projekt inicializujete pomocou komunitného nástroja príkazom `npx @react-native-community/cli init MyBareApp`.

Medzi kľúčové vlastnotsti takéhoto projektu radíme:
* **Priama prítomnosť natívnych projektov v Gite:** Od prvého dňa máte v koreni repozitára priečinky `ios/` a `android/`. iOS časť predstavuje štandardný Xcode projekt so súbormi `Podfile`, `Info.plist`, `AppDelegate` a nastaveniami podpisovania. Android časť je štandardný Gradle projekt so súbormi `build.gradle`, `AndroidManifest.xml` a zdrojovými kódmi v Jave alebo Kotline.
* **Manuálna konfigurácia:** Každé systémové nastavenie – ako pridanie ikony aplikácie, splash screenu, oprávnení pre kameru či lokalizáciu, zmena Bundle Identifieru alebo zapojenie push notifikácií – vyžaduje manuálny zásah priamo do natívnych konfiguračných súborov v Xcode a Android Studiu.
* **Kedy sa táto cesta používa:** Je vhodná najmä pre takzvanú Brownfield integráciu, kedy vkladáte React Native obrazovku do existujúcej veľkej natívnej aplikácie písanej v čistom Swifte alebo Kotline, prípadne pre špecifické enterprise systémy s vlastnými internými C++ knižnicami a vlastným build toolchainom.
* **Úskalia „Bare“ prístupu:** Hlavnou nevýhodou sú náročné upgrady verzií React Native, ktoré si vyžadujú ručné prepisovanie zmien v desiatkach natívnych súborov (často cez nástroj React Native Upgrade Helper). Vývojársky tím navyše musí podrobne ovládať nástroje Xcode, CocoaPods a Gradle.

#### Expo Framework (Moderný štandard & CNG)

Expo začínalo v minulosti ako jednoduchý uzavretý nástroj, no dnes predstavuje komplexný produkčný framework a oficiálne odporúčaný štandard tímu Reactu a Mety pre vývoj v React Native. Nový projekt sa zakladá príkazom `npx create-expo-app@latest my-expo-app`.

Kľúčovými vlastnosťami Expo frameworku sú:
* **Continuous Native Generation (CNG / Prebuild):** V repozitári priečinky `ios/` a `android/` nemusia vôbec existovať a bežne sú ignorované v `.gitignore`. Sú vnímané iba ako dočasný artefakt buildu, ktorý si Expo kedykoľvek vygeneruje znova príkazom `npx expo prebuild`.
* **Jediný zdroj pravdy (`app.json`):** Celú konfiguráciu aplikácie (názov, ikony, splash screen, bundle ID, systémové oprávnenia či URL schémy) definujete na jedinom mieste v deklaratívnom súbore `app.json` (alebo `app.config.js`). Pri zostavení Expo vezme tieto nastavenia a pomocou mechanizmu Config Plugins automaticky vygeneruje a upraví natívne súbory za vás.
* **Výhody Expo workflow:** Aktualizácia na novú verziu React Native spočíva zvyčajne v zmene verzie v `package.json` a pregenerovaní natívnych priečinkov, bez manuálneho riešenia konfliktov. Na začiatku vývoja navyše nepotrebujete mať nainštalovaný Xcode ani Android Studio, kód môžete ihneď spustiť a testovať na svojom mobile cez aplikáciu Expo Go. Vďaka podpore Development Builds nemáte žiadne obmedzenia a môžete použiť akýkoľvek vlastný natívny kód v Swifte, Kotline či C++.

### Zhrnutie: Bare React Native vs. Expo
* **Vytvorenie projektu:** Bare využíva `@react-native-community/cli`, zatiaľ čo Expo sa zakladá cez `create-expo-app`.
* **Správa natívneho kódu:** V Bare projekte sú priečinky `ios/` a `android/` pevne v Gite a udržiavate ich ručne. V Expo sa generujú automaticky podľa potreby.
* **Konfigurácia:** V Bare konfigurujete platformy oddelene v Xcode a Android Studiu. V Expo máte jeden centrálny konfiguračný súbor `app.json`.
* **Aktualizácie:** Upgrady v Bare môžu vyžadovať manuálny zásah do natívnych súborov, v Expo prebiehajú pregenerovaním kódu.
* **Prístup k vlastnému natívnemu kódu:** Obe cesty umožňujú 100 % voľný prístup k natívnemu kódu (Expo cez Development Builds).
* **Závislosť na nástrojoch:** Bare vyžaduje kompletný lokálny Xcode a Android Studio toolchain hneď od začiatku. Expo umožňuje okamžitý vývoj cez aplikáciu Expo Go priamo na fyzickom zariadení.
* **Odporúčanie:** Bare projekt má zmysel pri integrácii do existujúcich natívnych aplikácií, pre všetky nové projekty je dnes oficiálne odporúčaný framework Expo.

### Čo všetko Expo poskytuje?

Expo nie je alternatívou k React Native – Expo je React Native obohatený o kompletnú infraštruktúru nástrojov:

1. **Expo SDK:** Obrovská sada vyladených a udržiavaných knižníc pre prístup k hardvéru (Kamera, Notifikácie, Súborový systém, Lokalizácia, Senzory, Biometria).
2. **Expo CLI:** Vývojársky nástroj príkazového riadku na spúšťanie, testovanie a správu projektov.
3. **Expo Router:** Súborovo-orientovaný smerovač (File-based routing) inšpirovaný Next.js, ktorý prináša modernú navigáciu pre mobil aj web.
4. **EAS (Expo Application Services):** Cloudové služby pre zostavovanie inštalačných balíčkov (`.ipa` pre iOS, `.aab`/`.apk` pre Android), automatizované nasadzovanie do App Store / Google Play a OTA (Over-The-Air) aktualizácie bez nutnosti nového schvaľovania v obchodoch.

### Expo Go vs. Development Builds vs. Prebuild

Pri práci s Expo sa stretnete s tromi kľúčovými pojmami:

1. **Expo Go:**
   * Hotová aplikácia stiahnuteľná priamo z App Store alebo Google Play.
   * Na spustenie projektu stačí naskenovať QR kód z terminálu a kód beží ihneď na fyzickom telefóne.
   * Obsahuje vopred pripravené a skompilované moduly Expo SDK.
   * Limitácia: Nedá sa použiť, ak potrebujete vlastný natívny C++, Swift alebo Kotlin kód, ktorý nie je súčasťou štandardného Expo Go klienta.

2. **Development Build:**
   * Vlastná debug verzia vašej aplikácie s vaším unikátnym balíčkom, vygenerovaná pomocou `npx expo run:ios`, `npx expo run:android` alebo cez cloudový EAS Build.
   * Podporuje akýkoľvek vlastný natívny kód, knižnice tretej strany vyžadujúce natívne prepojenie (napr. Stripe, špeciálne SDK).
   * Predstavuje plnohodnotnú náhradu za Expo Go v pokročilých a produkčných aplikáciách.

3. **Continuous Native Generation (CNG / Prebuild):**
   * Princíp, pri ktorom sa priečinky `ios/` a `android/` generujú automaticky príkazom `npx expo prebuild`.
   * Celá konfigurácia natívnej vrstvy žije čisto v `app.json` a nie sú potrebné žiadne manuálne zásahy do Xcode projektov ani Gradle skriptov.

> 💡 **Prečo je CNG (Continuous Native Generation) revolúcia?**
> V minulosti museli vývojári manuálne prepájať knižnice (tzv. *linking*) v Xcode a Android Studiu, čo viedlo k častým konfliktom v `Podfile` alebo `build.gradle`. S Expo Prebuild sú natívne priečinky iba dočasným artefaktom zostavenia – môžete ich kedykoľvek zmazať a znova vygenerovať z vášho `app.json`.

---

> Zdroje k tejto sekcii:
> - https://docs.expo.dev/
> - https://docs.expo.dev/workflow/overview/
> - https://docs.expo.dev/workflow/continuous-native-generation/

---

## 6. Vytvorenie prvého projektu

Poďme od teórie k praxi. Vytvorenie moderného React Native projektu s Expo je otázkou jedného príkazu v termináli.

### Požiadavky (Prerequisites)
Pred spustením sa uistite, že máte nainštalované:
* **Node.js** (odporúčaná verzia LTS 22.x alebo 24.x)
* **Git**
* Terminál (macOS Terminal, iTerm2, zsh, bash)

### Vytvorenie projektu cez `create-expo-app`

Spustite vo vašom termináli:

```bash
# Vytvorenie nového projektu s názvom 'my-first-rn-app'
npx create-expo-app@latest my-first-rn-app
```

Tento príkaz automaticky inicializuje projekt s predvolenou modernou šablónou, ktorá obsahuje **TypeScript**, ukážkové komponenty a **Expo Router**.

#### Alternatívne šablóny (Templates)

Ak preferujete úplne čistý prázdny projekt bez ukážkových obrazoviek, môžete použiť parameter `--template`:

```bash
# Úplne čistý TypeScript projekt
npx create-expo-app@latest my-clean-app --template blank-typescript
```

Po dokončení inštalácie závislostí prejdite do vytvoreného priečinka:

```bash
cd my-first-rn-app
```

## 7. Popis štruktúry projektu

Pozrime sa, ako vyzerá štruktúra moderného Expo / React Native projektu:

```text
my-first-rn-app/
├── assets/                   # Statické assety v roote (ikona, splash screen)
│   └── images/               # icon.png, splash-icon.png
├── scripts/                  # Pomocné vývojárske skripty šablóny (napr. reset-project)
├── src/                      # Priečinok so zdrojovým kódom aplikácie
│   ├── app/                  # Obrazovky a routy aplikácie (Expo Router)
│   │   ├── (tabs)/           # Skupina obrazoviek s tab navigáciou
│   │   │   ├── index.tsx     # Hlavná domovská obrazovka (tab 1)
│   │   │   ├── explore.tsx   # Sekundárna obrazovka (tab 2)
│   │   │   └── _layout.tsx   # Definícia spodnej lišty (Tab Bar)
│   │   ├── +not-found.tsx    # Obrazovka 404 (pre neexistujúce cesty)
│   │   └── _layout.tsx       # Root layout celej aplikácie (Root Provider, témy)
│   ├── components/           # Znovupoužiteľné UI komponenty
│   ├── constants/            # Globálne konštanty (farby, témy)
│   └── hooks/                # Vlastné React hooky (useColorScheme, atď.)
├── app.json                  # Hlavný konfiguračný súbor v roote (Expo, iOS a Android metadáta)
├── package.json              # Zoznam závislostí a spúšťacie npm skripty (v roote)
└── tsconfig.json             # Konfigurácia TypeScriptu pre celý projekt (v roote)
```

### Kľúčové súbory a ich význam

#### 1. Súbory v koreňovom priečinku (Root)
* **`app.json`:** Riadiace centrum aplikácie. Definuje názov, verziu, orientáciu displeja, ikonu, splash screen a natívne identifikátory (`bundleIdentifier` pre iOS a `package` name pre Android):

```json
{
  "expo": {
    "name": "My First RN App",
    "slug": "my-first-rn-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myfirstrnapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.company.myfirstrnapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.company.myfirstrnapp"
    }
  }
}
```

* **`package.json`:** Definuje npm balíčky projektu, verzie Reactu a React Native a spúšťacie skripty (`npm start`, `npm run ios`, `npm run android`).
* **`tsconfig.json`:** Nastavenie TypeScript kompilátora a mapovania ciest (`path aliases`).
* **`assets/`:** Statické vizuálne súbory (ikona aplikácie, splash screen, adaptive icon).
* **`scripts/`:** Nástrojové skripty dodávané šablónou (napr. na vyčistenie ukážkového kódu).

#### 2. Kód v priečinku `src/` (Expo Router a logika)
Všetok zdrojový kód žije oddelene v priečinku `src/`:
* **`src/app/` (Expo Router):** Hierarchia súborov v tomto priečinku automaticky definuje navigáciu aplikácie:
  * Každý súbor (napr. `src/app/profile.tsx`) automaticky vytvorí obrazovku na URL ceste `/profile`.
  * Súbory `_layout.tsx` slúžia na obalenie podriadených obrazoviek do navigačných kontajnerov (Stack, Tabs).
* **`src/components/`:** Znovupoužiteľné UI prvky (tlačidlá, karty, dialógy).
* **`src/constants/`:** Centrálne definované hodnoty (farebné palety, témy).
* **`src/hooks/`:** Zdieľané React hooky (napr. pre sledovanie svetlej/tmavej témy).

#### 3. Kde sú priečinky `ios/` a `android/`?
V predvolenom Expo projekte ich **nevidíte**. Sú generované "on the fly" v pamäti pomocou nástroja Expo Prebuild. 

Ak by ste ich z akéhokoľvek dôvodu potrebovali fyzicky vygenerovať a prezrieť si natívny Xcode / Android Studio projekt, stačí spustiť:
```bash
npx expo prebuild
```
Vytvoria sa adresáre `ios/` a `android/`. Pamätajte však, že v modernom Expo workflow sa tieto priečinky zvyčajne ignorujú v `.gitignore`, pretože ich viete kedykoľvek reprodukovať z `app.json`.

## 8. Spustenie projektu a vývojársky workflow

Aplikáciu spustíme jednoduchým príkazom:

```bash
npx expo start
```

Terminál spustí **Metro Bundler** a zobrazí interaktívne menu spolu s veľkým **QR kódom**:

```text
...

› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Using Expo Go
› Press a │ open Android emulator
› Press i │ open iOS simulator
› Press w │ open web
› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

### Čo je Metro Bundler?

**Metro** je dedikovaný a optimalizovaný JavaScriptový bundler vyvinutý špeciálne pre React Native (v mobilnom vývoji plní rovnakú rolu ako Webpack, Vite či Rollup vo svete webu).

Jeho kľúčovou úlohou je vziať stovky až tisíce jednotlivých súborov vášho projektu, závislostí z `node_modules` a statických assetov (obrázkov či fontov) a pretaviť ich do jediného JavaScriptového balíka (bundle), ktorému rozumie JavaScript engine v mobilnom zariadení (Hermes).

```text
┌────────────────────────────────────────────────────────────────────────┐
│ VRSTVA 1: Zdrojové súbory a assety (Source Files & Dependencies)       │
│ Váš kód (.tsx, .ts, .js), knižnice z node_modules, obrázky a fonty     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ VRSTVA 2: Metro Bundler (Spracovanie, Transformácia & Dev Server)      │
│ Resolution (graf závislostí) ➔ Transformation (Babel) ➔ Serialization  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ VRSTVA 3: Klientske zariadenie (Runtime / Mobilný telefón)             │
│ Hermes JS Engine (vykonáva bundle) ➔ React Native Fabric/TurboModules  │
└────────────────────────────────────────────────────────────────────────┘
```

#### Ako Metro funguje pod povrchom (3 fázy spracovania)

Proces zostavovania kódu v Metre prebieha v troch fázach:

1. **Resolution (Riešenie závislostí):**
   * Metro začína od vstupného súboru aplikácie (entry point, napr. `src/app/_layout.tsx` alebo `index.js`).
   * Prechádza všetky príkazy `import` a `require()` a rekurzívne zostavuje **graf závislostí** (dependency graph) celého projektu.
   * Automaticky rieši platformovo špecifické prípony – napríklad ak na iOS importujete `./Button`, Metro automaticky uprednostní súbor `Button.ios.tsx` pred `Button.tsx`.

2. **Transformation (Transformácia kódu):**
   * Všetky nájdené moduly sa paralelne transformujú cez transpilér (Babel / SWC).
   * Moderný TypeScript, JSX a najnovšie JavaScriptové prvky sa prevedú do formátu, ktorý plne podporuje cieľový JS engine v zariadení.
   * Metro využíva agresívnu viacúrovňovú medzipamäť (cache). Ak upravíte jeden súbor, pretransformuje sa iba tento jediný súbor a zvyšok sa bleskovo načíta z cache.

3. **Serialization (Serializácia a zostavenie balíka):**
   * Všetky pretransformované moduly sa usporiadajú a spoja do jedného uceleného súboru – finálneho **JavaScript bundle**.
   * Zároveň sa vygenerujú **Source Maps** na presné ladenie chýb a priradia sa optimalizované číselné identifikátory modulom, aby mal výsledný balík minimálnu veľkosť.

#### Vývojový režim vs. Produkcia

* **Počas vývoja (Development mode):**
  * Metro beží ako lokálny **HTTP a WebSocket server** na vašom počítači (štandardne na porte `8081`).
  * Mobilná aplikácia (v simulátore alebo na fyzickom telefóne cez Expo Go) si pri štarte stiahne bundle cez sieť (Wi-Fi alebo USB kábel).
  * Využíva **Fast Refresh (Hot Module Replacement)**: pri uložení zmeny v editore Metro cez WebSocket pošle do telefónu iba modifikovaný modul. Zmena sa na obrazovke prejaví za zlomok sekundy bez nutnosti reštartovať aplikáciu a bez straty aktuálneho stavu (state).

* **V produkčnom builde (Release build):**
  * Metro počas behu aplikácie u koncového používateľa vôbec nebeží.
  * Pri zostavovaní finálnej inštalácie (`.apk` pre Android, `.ipa` pre iOS) Metro vopred vygeneruje statický bundle.
  * Tento bundle sa v prípade moderného React Native predkompiluje do optimalizovaného **Hermes Bytecode** (`.hbc`) a pribalí sa priamo do inštalačného balíčka aplikácie. Kód sa tak spúšťa okamžite z lokálneho úložiska telefónu bez akéhokoľvek sťahovania zo siete.

### Možnosti spustenia aplikácie

1. **Na fyzickom telefóne (najrýchlejšie):**
   * Nainštalujte si aplikáciu **Expo Go** z App Store (iOS) alebo Google Play (Android).
   * **iOS:** Otvorte vstavanú aplikáciu *Fotoaparát* a naskenujte QR kód z terminálu. Kliknite na zobrazenú notifikáciu, ktorá otvorí Expo Go.
   * **Android:** Otvorte aplikáciu *Expo Go*, zvoľte "Scan QR code" a naskenujte kód.
   * *Poznámka:* Počítač aj telefón musia byť pripojené na **rovnakej Wi-Fi sieti**.

2. **V iOS Simulátore (vyžaduje macOS a Xcode):**
   * V termináli so spusteným projektom stlačte klávesu **`i`**.
   * Automaticky sa otvorí iOS Simulator a nainštaluje Expo aplikácia.

3. **V Android Emulátore (vyžaduje Android Studio):**
   * V termináli stlačte klávesu **`a`**.
   * Spustí sa nakonfigurovaný Android Virtual Device (AVD).

4. **Vo webovom prehliadači:**
   * V termináli stlačte klávesu **`w`**.
   * Aplikácia sa otvorí v prehliadači cez `react-native-web`.

### Vývojársky cyklus (Developer Experience)

React Native ponúka mimoriadne rýchly cyklus spätnej väzby:

* **Fast Refresh:** Akonáhle upravíte a uložíte ľubovoľný `.tsx` súbor v editore, zmeny sa okamžite prejavia v bežiacej aplikácii **bez straty aktuálneho stavu komponentov** (React state zostáva zachovaný).
* **Developer Menu:** 
  * V simulátore stlačte: `Cmd + D` (iOS) alebo `Cmd + M` (Android).
  * Na fyzickom telefóne: **zatraste zariadením (shake gesture)** alebo klepnite tromi prstami.
  * Menu vám umožní manuálny reload, zapnutie zobrazenia elementov (Element Inspector) alebo otvorenie vzdialeného debuggera (React DevTools).

## 9. Zhrnutie lekcie

1. **React Native** spája vývojársky komfort a deklaratívnu silu Reactu s výkonom a používateľským zážitkom skutočných natívnych aplikácií.
2. Namiesto HTML elementov manipuluje React Native priamo **natívne komponenty systému** (`UIView` / `android.view.View`).
3. **Nová architektúra** odstránila starý úzky asynchrónny Bridge a nahradila ho priamym prepojením **JSI**, moderným rendererom **Fabric**, rýchlym enginom **Hermes** a lenivo načítavanými **TurboModules**.
4. **Vykresľovací reťazec (Render Pipeline)** pozostáva z troch fáz: **Render** (tvorba nemenného C++ tieňového stromu), **Commit** (výpočet layoutu cez Yoga a povýšenie stromu) a **Mount** (diffing, view flattening a vykreslenie natívnych zobrazení na UI vlákne).
5. **Snímková frekvencia a výkon (Frames):** Cieľom je dosiahnuť 60 FPS (časový limit 16,67 ms na snímku). React Native meria **JS frame rate** (biznis logika, react render, touch handling) a **UI frame rate** (kreslenie pixelov a natívne animácie na hlavnom vlákne).
6. **Expo** je dnes odporúčaným štandardom pre vývoj v React Native. Zjednodušuje prístup k natívnym API, odstraňuje nutnosť manuálnej konfigurácie v Xcode a prináša Continuous Native Generation (Prebuild).
7. Štart projektu cez `npx create-expo-app` a `npx expo start` poskytuje okamžitý vývojársky zážitok s funkciou Fast Refresh priamo na vašom fyzickom zariadení alebo v simulátore.

---

> ### Zoznam odporúčaných zdrojov a literatúry:
> - 📖 **Oficiálna React Native dokumentácia:** [https://reactnative.dev/](https://reactnative.dev/)
> - 📖 **Oficiálna Expo dokumentácia:** [https://docs.expo.dev/](https://docs.expo.dev/)
> - 🏛️ **React Native New Architecture Guide:** [https://reactnative.dev/docs/the-new-architecture/landing-page](https://reactnative.dev/docs/the-new-architecture/landing-page)
> - 🔄 **React Native Render Pipeline:** [https://reactnative.dev/architecture/render-pipeline](https://reactnative.dev/architecture/render-pipeline)
> - ⚡ **React Native Performance - Frames:** [https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames](https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames)
> - ⚙️ **Hermes Engine Architecture:** [https://hermesengine.dev/](https://hermesengine.dev/)
> - 📐 **Yoga Layout Engine (C++ Flexbox):** [https://www.yogalayout.dev/](https://www.yogalayout.dev/)
> - 🧭 **Expo Router Documentation:** [https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)
