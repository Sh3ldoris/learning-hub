# 1 - Úvod do React Native Akadémie

## Welcome talk

Skôr ako sa vrhneme na jednotlivé lekcie, zopakujme si, čo to vlastne React Native je. A to pekne od základov.

## React ako základ

Aby sme sa mohli dostať k samotnému React Native, musíme si najprv prejsť Reactom. React je open-source JavaScript knižnica založená na budovaní rozhrania pomocou komponentov. Počiatky Reactu sa datujú do rokov 2011 až 2013 (2011 - News Feed, 2012 - Instagram, 2013 open sourced). Poďme si zopakovať históriu kvízovou otázkou.

Facebook si v roku 2011 React vyskúšal najprv na News Feed appke, ktorú skôr poznáte ako Facebook Nástenka. Tá sa im zdala ako ideálny kandidát pre React, pretože to bola časť, pri ktorej sa očakávala vysoká interakcia a časté zmeny, ako napr. pridávanie, like-ovanie a komentovanie postov. V tej dobe sa pre webové technológie najčastejšie používali frameworky, ktoré využívali architektonický vzor MVC a imperatívny štýl programovania. Inžinieri Facebooku v tomto videli niekoľko problémov. Poďme si vysvetliť prečo.

**Model-View-Controller** architektonický vzor funguje na princípe oddelenia zodpovednosti (Separation of Concerns). **Model** predstavuje dáta a ich stav, ale aj logiku na ich získanie a odovzdávanie. **Controller** na základe vstupov používateľa vyžaduje manipuláciu dát. Následne sa aktualizované dáta zobrazujú pomocou **View**. Ukážme si jednoduchý príklad takejto appky v čistom JavaScripte.

UI webových aplikácií bolo bežne postavené na šablónach, pre náš malý Todo App príklad vyzerá HTML šablóna takto:
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Todo App</title>
</head>

<body>
  <div id="root"></div>

  <script src="script.js"></script>
</body>

</html>
```

Ako sme si spomínali, **Model** komponent spravuje dáta aplikácie, v tomto našom prípade získanie zoznamu Todos z lokálneho úložiska a pridanie nového todo itemu.

```js
class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback
  }

  _commit(todos) {
    this.onTodoListChanged(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
    }

    this.todos.push(todo)
    this._commit(this.todos)
  }
}
```

**View** komponent predstavuje vizuálnu reprezentáciu nášho modelu:

```js
class View {
  constructor() {
    this.app = this.getElement('#root')
    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Add Todo'
    this.todoList = this.createElement('ul', 'todo-list')
    this.app.append(this.submitButton, this.todoList)
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)
    return element
  }

  getElement(selector) {
    const element = document.querySelector(selector)
    return element
  }

  displayTodos(todos) {
    todos.forEach(todo => {
      const li = this.createElement('li')
      li.id = todo.id
      this.todoList.append(li)
    })
  }

  bindAddTodo(handler) {
    this.submitButton.addEventListener('click', event => {
      handler('New Item')    
    })
  }
}
```
**Controller** komponent slúži ako prepojenie vstupov od používateľa a výstupov v podobe zobrazovania aktuálnych dát.

```js
class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindTodoListChanged(this.onTodoListChanged)
    this.view.bindAddTodo(this.handleAddTodo)
  }

  onTodoListChanged = todos => {
    this.view.displayTodos(todos)
  }

  handleAddTodo = todoText => {
    this.model.addTodo(todoText)
  }
}
```

Naša Todo App vyzerá a funguje nasledovne:
1. Pomocou HTML šablóny a MVC komponentov sa v `div` elemente s `id='root'` vykreslí tlačidlo s názvom `Add Todo`.
2. Používateľ klikne na `Add Todo` tlačidlo, čo odchytí `click` event listener **View** komponentu a odošle túto informáciu **Controller** komponentu. 
3. **Controller** následne povie **Model** komponentu, aby vytvoril novú Todo položku a pridal ju do zoznamu Todos.
4. **Model** upraví zoznam Todos s novým itemom, uloží aktualizovaný zoznam do lokálneho úložiska a posunie ho naspäť **Controller** komponentu. 
5. **Controller** tento aktualizovaný zoznam Todos predá **View** komponentu, ktorý ho zobrazí pomocou HTML šablóny.
6. Používateľ vidí zoznam Todos s novou `New Item` todo položkou.

Možno si teraz hovoríte: "veď to je celkom rozumné" – takéto rozdelenie zodpovednosti do osobitných komponentov. A máte pravdu. MVC vzor má svoje opodstatnenie a tešil sa veľkej obľube. Prečo teda inžinierom z Facebooku nevyhovoval?

Vráťme sa späť k prípadu, pre ktorý sa vo Facebooku rozhodli použiť React namiesto vtedy tradičného MVC vzoru. Ako som spomínal, Facebook Nástenka obsahuje veľké množstvo dát a akcií. Na začiatku Nástenka ponúkala používateľom vidieť zoznam príspevkov a ich komentárov, taktiež možnosť dať like na príspevok alebo komentovať príspevok. Toto sú akcie, ktoré menia stav príspevku (manipulujú Model). Dané akcie však môže nad jedným príspevkom vykonávať veľké množstvo používateľov, takže počet akcií sa zvyšuje. Keď k tomu pridáte ďalšie akcie, ktoré pribudli neskôr, ako zdieľanie, reakcie, pridávanie obrázkov a pod., tak nám narastá komplexita a kód sa stáva náročný na zmeny. Navyše môžete vidieť, že aj taká malá aplikácia ako naša Todo App obsahuje veľké množstvo boilerplate kódu. Vo Facebooku tieto problémy nastali pri implementácii Ads Manager appky. Jej vývojári sa dostali do bodu, kedy už pridanie akejkoľvek zmeny bolo extrémne náročné, ba až nemožné. Tak prišli s riešením zvaným **React**.

Ako tieto problémy React rieši? React pristupuje k budovaniu UI pomocou komponentov. Na rozdiel od HTML šablón sa na vykresľovanie Views používa "reálny" programovací jazyk – JavaScript – so všetkými jeho funkcionalitami. Navyše, JavaScript je flexibilný a umožňuje vytvárať abstrakcie, čo je veľmi dôležité pre budovanie veľkých aplikácií. Zjednotením markupu (JSX) a logiky Views sa zabezpečilo ich jednoduché rozširovanie a udržiavanie. Taktiež si zvolili deklaratívny štýl manipulácie UI namiesto pridržiavania sa imperatívnych paradigiem, ako v tej dobe väčšina tradičných JavaScriptových frameworkov.

### Imperatívne vs deklaratívne UI programovanie

Keď už ich toľko spomíname, poďme si pripomenúť, aké sú hlavné rozdiely medzi imperatívnym a deklaratívnym UI programovaním, najprv pomocou krátkej teórie:
1. **Syntax** – **imperatívny prístup** je známy programovaním krok po kroku, kde sa špecifikujú inštrukcie, ako sa má niečo vykonať. Pri **deklaratívnom programovaní** sa skôr zameriavame na výsledok ako na spôsob dosiahnutia výsledku.
2. **Manažment stavu** – **deklaratívny prístup** od nás vyžaduje zadefinovať stav, ktorý chceme dosiahnuť, a jeho manažment je väčšinou na samotnom jazyku alebo frameworku. **Imperatívne programovanie** na druhú stranu vyžaduje explicitný manažment stavov, kde je potrebné manuálne sledovať a upravovať stav.

Teraz si to ale skúsme vysvetliť. Pravdepodobne vždy, keď navrhujeme UI interakcie, tak myslíme na to, ako sa bude UI meniť vzhľadom na vstupy používateľa. Predstavme si jednoduchý formulár, kde používateľ môže zadať odpoveď. Interakcia by vyzerala nejak takto:

1. Začnem písať do formuláru text, 'Submit' tlačidlo sa sprístupní.
2. Stlačím 'Submit' tlačidlo, formulár a tlačidlo sa znesprístupnia a zobrazí sa načítavanie. 
3. Ak sa request skončí úspešne, formulár sa skryje a zobrazí sa úspešná hláška.
4. Ak sa request skončí chybou, formulár sa sprístupní a zobrazí sa chybová hláška.

Pri imperatívnom programovaní je toto presne postup, akým by sa implementovala interakcia. Musíte napísať presné inštrukcie, ako sa má meniť UI vzhľadom na to, čo sa stalo.

Ďalším pekným príkladom, ako rozoznať rozdiel medzi deklaratívnym a imperatívnym prístupom, je navigovanie. Predstavte si, že ste spolucestujúci v aute a chcete, aby vás šofér auta niekam odviezol. V imperatívnom svete to funguje tak, že mu celú cestu hovoríte, kedy má kam odbočiť. Šofér vlastne nevie, kam ide, len počúva vaše príkazy, a ak mu náhodou dáte zlý príkaz, tak sa nedostanete tam, kam chcete. Slovo 'imperatívny' znamená 'prikazovací', takže vlastne len prikazujeme nášmu programu, ako má meniť UI. Ukážme si, ako by vyzeral imperatívny kód pre náš príklad s formulárom.

```html
<form id="form">
  <h2>City quiz</h2>
  <p>
    What city is located on two continents?
  </p>
  <textarea id="textarea"></textarea>
  <br />
  <button id="button" disabled>Submit</button>
  <p id="loading" style="display: none">Loading...</p>
  <p id="error" style="display: none; color: red;"></p>
</form>
<h1 id="success" style="display: none">That's right!</h1>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
</style>
```

```js
async function handleFormSubmit(e) {
  e.preventDefault();
  disable(textarea);
  disable(button);
  show(loadingMessage);
  hide(errorMessage);
  try {
    await submitForm(textarea.value);
    show(successMessage);
    hide(form);
  } catch (err) {
    show(errorMessage);
    errorMessage.textContent = err.message;
  } finally {
    hide(loadingMessage);
    enable(textarea);
    enable(button);
  }
}

function handleTextareaChange() {
  if (textarea.value.length === 0) {
    disable(button);
  } else {
    enable(button);
  }
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === 'istanbul') {
        resolve();
      } else {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      }
    }, 1500);
  });
}

let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;
```

Ako vidíte, v imperatívnom programovaní pristupujeme k UI elementom jednotlivo a meníme ich stav v postupnosti krokov. Toto môže dobre fungovať pre nejaké izolované príklady alebo menšie aplikácie, ale je náročné na udržiavanie v komplexnejších systémoch. Ak by sme takýto formulár rozšírili o niekoľko ďalších vstupov či iných elementov, s ktorými používateľ interaguje, museli by sme prísne kontrolovať už existujúci kód, aby sme nevytvorili nejaký bug (napríklad by sme zabudli skryť alebo sprístupniť niektoré z nových elementov pri rôznych interakciách). A tu sa vraciame späť k spomínanej Ads Manager appke Facebooku.

### React a deklaratívne UI

React bol vytvorený, aby toto vyriešil. V Reacte nemanipulujeme UI priamo – nepristupujeme ku komponentom priamo, aby sme ich skryli či sprístupnili. Namiesto toho **deklarujeme**, čo chceme zobraziť, a React si sám zistí, ako má upraviť UI. Ak by sme mali použiť náš príklad s navigovaním, tak je to ako keď nastúpite do auta a poviete šoférovi, kam chcete ísť, namiesto toho, aby ste mu dávali inštrukcie. Jeho prácou je vás tam dostať a vy nemusíte vedieť ako.

Teraz už vieme, aký je rozdiel medzi imperatívnym a deklaratívnym prístupom, poďme si ale vysvetliť, ako by sme mali rozmýšľať o UI deklaratívne. Zoberme si náš príklad s formulárom a poďme ho premyslieť znova, ale tentokrát deklaratívne s Reactom. Použijeme na to 5 jednoduchých krokov:

1. Identifikujme, aké rôzne vizuálne stavy môže mať náš komponent.
2. Určme, čo spúšťa zmeny jeho stavov.
3. Vyjadrime jeho stav pomocou `useState`.
4. Odstráňme všetky nadbytočné state premenné.
5. Napojme event handlery pre nastavovanie stavu.

#### 1. Identifikácia vizuálnych stavov komponentu

Možno ste sa už vo svete programovania stretli s pojmom "state machine" (sk preklad stavový automat), ktorý prechádza množinou stavov. A ak ste už pracovali s dizajnérmi, tak poznáte dizajnové "mockupy" (vizualizácie) pre rôzne "vizuálne stavy". React stojí na priesečníku týchto dvoch svetov a obe tieto idey boli pre React zdrojom inšpirácie.

Ako prvé si teda pomenujme, v akých vizuálnych stavoch môže používateľ vidieť naše UI:

- **Prázdny** (empty): žiaden text, neprístupné tlačidlo.
- **Písanie** (typing): zadaný text, sprístupnené tlačidlo.
- **Potvrdenie** (submitting): celý formulár neprístupný, zobrazené načítavanie.
- **Úspech** (success): formulár skrytý, zobrazená úspešná hláška.
- **Chyba** (error): formulár sprístupnený, zobrazená chybová hláška.

Skôr ako pridáme nejakú logiku, si tak najprv pripravíme vizualizácie jednotlivých stavov, ako to robia dizajnéri.

```js
export default function Form({
  // options 'empty', 'typing', 'submitting', 'error', 'success':
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
        {status === 'submitting' &&
          <p className="Loading">
            'Loading...'
          </p>
        }
      </form>
      </>
  );
}
```

#### 2. Určenie spúšťačov zmien stavov

Vo všeobecnosti existujú dva hlavné spúšťače zmien stavov:

- **vstupy používateľa** – stlačenie tlačidla, vloženie textu, navigácia cez link...
- **vstupy počítača** – ukončenie asynchrónnej operácie ako odpoveď zo servera, načítanie obrázku a pod.

V oboch týchto prípadoch musíme nastaviť stavové premenné kvôli aktualizovaniu UI. V našom formulári máme niekoľko spúšťačov, pri ktorých je potrebné zmeniť stav:

- **Zmena textového vstupu** (používateľ) zmení stav z `empty` na `typing`, alebo naopak, podľa toho, či sa v textovom poli nachádza nejaký text.
- **Kliknutie na 'Submit' tlačidlo** (používateľ) vyvolá zmenu stavu na `submitting`.
- **Úspešná odpoveď zo servera** (počítač) zmení stav na `success`.
- **Chybová odpoveď zo servera** (počítač) zmení stav na `error`.

Zmeny stavov si je dobré vizualizovať napríklad pomocou jednoduchého flow diagramu, ktorý si môžete načrtnúť na papier a získate tým lepší prehľad nad stavmi.

#### 3. Vyjadrenie stavov pomocou `useState`

Následne potrebujeme nejako reprezentovať naše stavy v pamäti – na to využijeme React `useState` hook. Pri tomto je kľúčová **jednoduchosť**. Každú časť nášho celkového stavu môžeme považovať za akúsi 'pohyblivú časť', no a vo výsledku chceme mať čo najmenej takýchto 'pohyblivých častí'. Pamätajte si, že čím väčšia je komplexita, tým väčšia je šanca na zavedenie bugov. 

Vždy začínajte so stavmi, ktoré sú absolútne nevyhnutné.

Náš formulár obsahuje textové pole, takže určite budeme potrebovať ukladať text odpovede používateľa, a taktiež budeme potrebovať ukladať chybu v prípade chybovej odpovede.

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
```

Potom budeme potrebovať stavovú premennú pre každý náš vizuálny stav, ktorý sme si definovali. Tu väčšinou existuje viacero možností, ako reprezentovať rôzne stavy v pamäti, takže je potrebné experimentovať. Nie vždy nájdeme správny spôsob hneď na prvýkrát, hlavne sa musíme ubezpečiť, že sme zahrnuli všetky potrebné stavy. Neskôr môžeme naše riešenie refaktorovať.

```js
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

#### 4. Odstránenie nadbytočných stavových premenných

V prvom rade sa chceme zbaviť duplicít. Cieľom je, aby sme zabránili prípadom, kedy náš stav v pamäti reprezentuje nejaký nevalidný UI stav. Napríklad nechceme, aby bola zobrazená chybová hláška a zároveň zneprístupnené textové pole, inak používateľ nemôže opraviť svoju odpoveď. 

Tu je zopár otázok, ktoré môžete použiť pri refaktorovaní stavov:

- **Spôsobuje tento stav paradox?** Paradox napríklad nastáva, ak niektoré zo stavových premenných nemôžu mať v jednom čase rovnakú hodnotu. Zvyčajne je to preto, že stav nie je dostatočne obmedzený.

- **Je rovnaký stav dostupný pomocou inej stavovej premennej?** Ak máme viacero premenných vyjadrujúcich rovnaký stav ako samostatné premenné, riskujeme, že budú out of sync, čo bude spôsobovať bugy.

- **Vieme získať rovnakú informáciu z opačnej hodnoty inej premennej?**

- Príklad paradoxu, `isTyping` a `isSubmitting` nemôžu byť v tom istom čase `true`. Existujú štyri rôzne kombinácie týchto dvoch booleanov, no len tri z nich sú validným stavom. Odstránenie nemožného stavu je možné skombinovaním troch validných stavov do `status` premennej, ktorá môže prijať jednu z hodnôt `typing`, `submitting` a `success`.
- Ďalším paradoxom je, že `isEmpty` a `isTyping` nemôžu byť `true` v rovnakom čase. Namiesto toho vieme `isEmpty` odstrániť a kontrolovať `answer.length === 0`.
- Odstrániť môžeme aj `isError` a kontrolovať len `error !== null`.

Po takomto refaktore sme znížili počet stavových premenných zo 7 na 3 základné:

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

#### 5. Napojenie event handlerov pre nastavovanie stavu

Nakoniec musíme vytvoriť event handlery, ktoré budú náš stav meniť.

```js
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
        {status === 'submitting' &&
          <p className="Loading">
            'Loading...'
          </p>
        }        
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

> Zdroje: 
> - https://react.dev/learn/reacting-to-input-with-state#how-declarative-ui-compares-to-imperative

#### Tvorba UI pomocou JSX

Vysvetlili sme si, ako by sme mali s Reactom a deklaratívnym prístupom tvoriť UI cez stavy a `useState`, ukázali sme si aj, ako pridať logiku na manipulovanie stavu. Poslednou časťou, ktorú sme si ukázali, no veľmi o nej nerozprávali, je markup. Je to časť, ktorá sa vyrenderuje v prehliadači, takže môžeme povedať, že je to naše UI. V Reacte sa na písanie takéhoto markupu používa **JSX**. 

JSX je rozšírenie syntaxe pre JavaScript, ktoré umožňuje tvorbu UI v štruktúre podobnej HTML markupu, ale v JavaScript súboroch. Už sme si spomínali, že väčšina frameworkov pred príchodom Reactu využívala MVC a Separation of Concerns. S tým súvisí aj oddelenie HTML, CSS a JavaScriptu vo webovom svete, kde HTML obsahovalo UI, CSS dizajn a JavaScript logiku. Najčastejšie v separátnych súboroch. S postupným nárastom interaktivity začal UI určovať stále viac JavaScript a stal sa tak zodpovedným za HTML časť. Preto React drží renderovaciu logiku a UI markup na jednom mieste – v **komponentoch**.

```js
function Form() {
  // logic
  onClick() {...}
  onSubmit() {...}

  // UI
  return (
    <form onSubmit>
      <input onClick />
      <input onClick />
    </form>
  );
}
```

JSX sa dosť podobá na HTML, no má o niečo striktnejšie pravidlá a dokáže zobrazovať dynamický obsah. Tu sú základné pravidlá JSX:

1. **Jeden root element** – JSX komponent musí vrátiť práve jeden root element. Ak potrebujeme vrátiť viacero elementov, musia byť wrapnuté jedným rodičovským elementom.

```jsx
<>
  <h1>localhost.company</h1>
  <img 
    src="https://bit.ly/4cdrOew" 
    alt="localhost.company" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

Ak nepotrebujeme použiť žiaden konkrétny element, môžeme využiť Fragment `<> </>`, ktorý predstavuje prázdny tag a slúži na zgrupovanie elementov, v prehliadači navyše nezanechá žiadnu stopu.

2. **Všetky tagy sú uzatvorené** – JSX vyžaduje, aby boli všetky tagy uzatvorené, či už sú to samouzatváracie tagy `<img />` alebo wrapovacie tagy `<li>IT's Safe with Us</li>`.

```jsx
<>
  <img 
    src="https://cdn.prod.website-files.com/6702f5ff4b09da7f2e1541b0/6777ff3543cf6f2336e1499c_OG.jpg"
    alt="localhost.company"
    class="photo"
   /> // self-closing tag
  <ul>
    <li>IT's Easy with Us</li> // wrapping tag
    <li>IT's Safe with Us</li>
    <li>IT's Swift with Us</li>
    <li>IT's Epic with Us</li>
  </ul>
</>
```

3. **camelCase takmer pre všetko** – keďže z JSX sa v konečnom dôsledku stane JavaScript, tak aj atribúty písané v JSX sa stanú kľúčmi JavaScript objektov. JavaScript má ale určité limitácie pre názvy premenných, napr. nesmú obsahovať pomlčku alebo rezervované kľúčové slová ako `class`. Preto sa v Reacte aj väčšina HTML atribútov píše camelCase, ako napr. namiesto `stroke-width` sa používa `strokeWidth`, či `className` namiesto spomínaného rezervovaného kľúčového slova `class`.

```jsx
<img 
  src="https://cdn.prod.website-files.com/6702f5ff4b09da7f2e1541b0/6777ff3543cf6f2336e1499c_OG.jpg"
  alt="localhost.company"
  className="photo"
/>
```

#### JSX pod kapotou

Na začiatku sme si povedali, že JSX je rozšírenie syntaxe pre JavaScript. Čo to ale znamená? V skratke, je to len dev-friendly spôsob, ako písať React kód. JSX sa totiž na pozadí transpiluje na JavaScript. Opäť, čo to ale znamená? Znamená to, že každý JSX element je vlastne JavaScript funkcia a JSX je len krajšia forma jej volania.

Ukážme si príklad, aby sme tomu lepšie rozumeli. Povedzme, že máme takýto jednoduchý kód:

```js
import React from 'react';

function App() {
  return <div id="root">IT's Equal with Us</div>;
}
```

Na pozadí sa tento JSX markup transformuje na klasický JavaScript kód:

```js
import React from 'react';

function App() {
  return React.createElement('div', { id: 'root' }, "IT's Equal with Us");
}
```

> !!! Disclaimer: `React.createElement` je Legacy API a od React 17 je možné používať nový spôsob transformácie JSX (the new JSX transform), ktorý je zároveň od React 19 povinný. `React.createElement` API je ale stále dostupné a momentálne nie je v pláne ho odstrániť.

A takto to vyzerá s použitím nového JSX transform, kde z tohto kódu:

```js
function App() {
  return <div id="root">IT's Equal with Us</div>;
}
```

získame po skompilovaní toto:

```js
// Inserted by a compiler (don't import it yourself!)
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('div', { 
    id: 'root',
    children: "IT's Equal with Us"
  });
}
```

Mohli ste si všimnúť, že pri použití nového JSX transform nemusíme mať v scope React, ak chceme používať JSX. To, spolu s vylepšením výkonu, sú hlavné výhody nového JSX transform.

Čo je ale výstupom `React.createElement`?

Element je jednoduchý popis časti používateľského rozhrania. Pre lepšie vysvetlenie, obe volania, `<Greeting name="localhost" />` a `React.createElement('Greeting', { name: 'localhost'})` vyprodukujú takýto objekt:

```json
// mierne zjednodusene
{
  type: Greeting,
  props: {
    name: 'localhost'
  },
  key: null,
  ref: null,
}
```

**Je dôležité si uvedomiť, že vytvorenie tohto objektu nespôsobuje vykreslenie komponentu a ani nevytvára žiadne DOM elementy.** Je to len popis, alebo akási šablóna, na základe ktorej React neskôr vyrenderuje `Greeting` komponent. Vytváranie takýchto elementov je extrémne ľahké, takže vôbec nie je potrebné to optimalizovať. Čo ale je náročné, je práve renderovanie komponentov.

> Zdroje: 
> - https://react.dev/learn/writing-markup-with-jsx
> - https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform
> - http://react.dev/reference/react/createElement

#### DOM a Virtuálny DOM

Keď už sme spomenuli DOM, poďme si pripomenúť, čo to vlastne je. V skratke, DOM, od Document Object Model, je stromová štruktúra, ktorú prehliadač vytvorí z vášho HTML kódu. Predstavuje webovú stránku ako objekt, ku ktorému môže JavaScript pristupovať a meniť ho (napr. upraviť text, zmeniť farbu či pridať nový prvok). JavaScript komunikuje s DOM-om prostredníctvom DOM API, napr. `document.getElementById('root')`.

Priama manipulácia s reálnym DOM-om je však pre prehliadač výpočtovo pomalá a prácna, najmä pri častých zmenách.

Riešením Reactu je niečo, čo môžete poznať pod nie vždy správne používaným pojmom **virtuálny DOM** (VDOM). Virtuálny DOM je totiž programátorský koncept, pri ktorom sa „virtuálne“ UI udržiava v pamäti a synchronizuje s „reálnym“ DOM-om pomocou knižnice, akou je napríklad ReactDOM. Tento proces sa nazýva rekonciliácia (reconciliation).

Tento prístup umožňuje deklaratívne API Reactu: Reactu poviete, v akom stave chcete, aby sa rozhranie nachádzalo, a on sa postará o to, aby DOM tomuto stavu zodpovedal. To nás oslobodzuje od manuálnej manipulácie s atribútmi, spracovania udalostí a priameho aktualizovania DOM-u, ktoré by sme inak museli pri tvorbe aplikácie používať.

DOM je ale len jedným z prostredí pre vykresľovanie, do ktorých dokáže React renderovať — ďalšími hlavnými cieľovými platformami sú natívne zobrazenia pre iOS a Android prostredníctvom React Native, kde už ale virtuálny DOM nefiguruje (občas sa ale VDOM nesprávne zamieňa s rekonciliáciou).

##### Rekonciliácia verzus renderovanie

Rekonciliácia je algoritmus stojaci za tým, čo sa označuje ako „virtuálny DOM“. Nejaké vysvetlenie na vyššej úrovni vyzerá asi takto: keď renderujete aplikáciu v Reacte, vygeneruje sa strom uzlov opisujúci aplikáciu a uloží sa do pamäte. Tento strom sa potom prenesie do prostredia pre vykresľovanie — napríklad v prípade prehliadača sa preloží do množiny operácií s DOM-om. Keď sa aplikácia aktualizuje (zvyčajne pomocou `setState`), vygeneruje sa nový strom. V novom strome sa porovnajú rozdiely (*diffing*) oproti predchádzajúcemu stromu, aby sa vypočítalo, ktoré operácie sú potrebné na aktualizáciu vykreslenej aplikácie.

Dôvodom, prečo React dokáže podporovať viacero cieľových platforiem, je to, že je navrhnutý tak, aby rekonciliácia a renderovanie boli oddelené fázy. Rekonciliátor (*reconciler*) vykonáva prácu spojenú s výpočtom toho, ktoré časti stromu sa zmenili. Renderer potom tieto informácie použije na samotnú aktualizáciu vykreslenej aplikácie.

Toto oddelenie znamená, že React DOM a React Native môžu používať svoje vlastné renderery a zároveň zdieľať rovnaký rekonciliátor, ktorý poskytuje samotné jadro Reactu (*React core*).

> Zdroje:
> - https://legacy.reactjs.org/docs/faq-internals.html
> - https://github.com/acdlite/react-fiber-architecture

#### Render & Commit

Poďme teraz do fázy renderovania. Predtým, než sa komponent zobrazí na obrazovke, musí ho React vyrenderovať. Je veľmi nápomocné poznať jednotlivé kroky tohto procesu, aby sme rozumeli, ako sa náš kód spúšťa a vedeli vysvetliť jeho správanie.

Keď si tento proces chceme ľahšie predstaviť, môžeme si ho prirovnať k procesu prípravy objednávky v reštaurácii. Komponenty sú v tomto prípade kuchári, ktorí pripravujú objednávku. React je zasa čašník, ktorý odovzdáva objednávku kuchárom a následne prinesie zákazníkom hotové jedlo.

Celý tento proces vyžiadania a poskytnutia UI sa skladá z troch krokov:
1. **Triggering** a render (odovzdanie objednávky od zákazníka kuchárom).
2. **Rendering** the component (príprava objednávky v kuchyni).
3. **Committing** to the DOM (prinesenie objednávky zákazníkovi na stôl).

Poďme si tieto kroky bližšie vysvetliť.

**Krok 1: Spustenie renderu**

Existujú dva dôvody na render komponentu:
1. Inicializačný render komponentu.
2. Stav komponentu (alebo jedného z jeho rodičov) sa zmenil.

Inicializačný render asi vysvetľovať netreba, z jeho názvu je jasné, že sa spúšťa po štarte aplikácie. Ak však chceme komponent meniť po jeho inicializačnom renderi, vieme ho re-renderovať **zmenou jeho stavu**, napríklad pomocou `setState` funkcie. Upravením stavu komponentu sa render automaticky zaradí do fronty. Treba mať ale na pamäti, že zmena UI sa nevykoná hneď. Vo svete reštaurácie by to znamenalo, že čašník prijme zmenu vašej objednávky, no nedá vám novú objednávku hneď. Stále ju najprv musí zaniesť kuchárom do kuchyne a počkať na jej prípravu, aby vám ju následne mohol doniesť na stôl.

**Krok 2: React renderuje komponent**

Po spustení renderu React zavolá komponent, aby zistil, čo má zobraziť na obrazovke. Ako sme si skôr spomínali, každý React komponent je vlastne funkcia, a takéto volanie komponentu Reactom nazývame **renderovanie**. Taktiež už vieme, že renderovanie sa vykonáva z dvoch dôvodov, teraz si vysvetlíme ako:

- Pri **inicializačnom renderi** React zavolá root komponent.
- Pri **následných re-renderoch** React volá komponent, ktorého zmena stavu spustila render.

Proces renderovania je rekurzívny. Ak zmenený komponent vráti/obsahuje iný komponent, React vyrenderuje aj tento daný komponent ako ďalší, a ak aj ten niečo vráti/obsahuje, tak opäť React vyrenderuje aj to, a tak ďalej. Proces takto pokračuje, až kým neexistujú žiadne ďalšie vnorené komponenty a React presne vie, čo má byť zobrazené na obrazovke.

Príklad: 

```jsx
// Gallery.js
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

```jsx
// index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
```

Pri inicializačnom renderi React vytvorí DOM uzly pre `<section>`, `<h1>` a tri `<img>` tagy. Pri ďalších re-renderoch React vyráta, ktoré z ich properties sa oproti poslednému renderu zmenili. Táto informácia sa však využije až v ďalšom kroku.

> ⚠️ Dôležité:
>
> Renderovanie musí byť vždy čistý výpočet (pure calculation):
> - **Rovnaký vstup, rovnaký výstup.** Pri poskytnutí rovnakého vstupu by mal komponent vždy vrátiť rovnaký JSX – ak si niekto objedná šalát s paradajkami, nemal by nikdy dostať šalát s cibuľou.
> - **Stará sa len o seba.** Renderovanie komponentu by nemalo ovplyvniť žiaden iný objekt alebo premennú vytvorenú pred renderom – moja objednávka by nemala zmeniť objednávku niekoho iného.
>
> Nedodržiavanie týchto pravidiel vedie k mätúcim bugom a neočakávanému správaniu aplikácie. Navyše sa takto zvyšuje komplexita projektu.

**Krok 3: React zapíše zmeny do DOM**

Posledný krok, zapísanie zmien do DOM Reactom, nastáva po renderi (zavolaní) komponentu. Čo sa stane, opäť záleží od toho, o aký render ide. Pri **inicializačnom renderi** React využíva `appendChild()` DOM API, pomocou ktorého vloží všetky vytvorené DOM uzly na obrazovku. Ak sa jedná o **re-render**, React aplikuje len nevyhnutné operácie (vyrátané počas renderovania), aby DOM reprezentoval najnovší výstup.

React totiž aktualizuje DOM uzly len ak nastanú zmeny medzi rendermi. Napríklad môžeme mať komponent, ktorý sa re-renderuje s novými props od rodiča každú sekundu, no hodnota `<input>` komponentu re-renderovania prežije.

```jsx
/// Clock.js

export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

Je to preto, že počas **commit** fázy React aktualizuje iba `<h1>` komponent s novou `time` hodnotou. Keďže vidí, že stav `<input>` komponentu sa v JSX nezmenil, React tento komponent ani jeho hodnotu nijak neupravuje. 

> Poznámka:
> Po tom, ako prebehne renderovanie a React upraví DOM, prehliadač prekreslí obrazovku. Tento proces sa nazýva „vykresľovanie prehliadačom“ (browser rendering). Aby sa predišlo zmätkom, často sa používa aj termín „painting“.

> Zdroje:
> - https://react.dev/learn/render-and-commit
