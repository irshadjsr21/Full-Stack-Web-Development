function sayHello(name) {
  console.log(`Hello ${name}`);
}

let name = 'World';
const args = process.argv;

if(args.length >= 3) {
  name = args.slice(2).join(' ');
}

sayHello(name);
