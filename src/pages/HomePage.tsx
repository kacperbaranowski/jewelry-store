import { Link } from 'react-router-dom'
import { getFeaturedProducts, categoryNames } from '../data/products'
import { ProductGrid } from '../components/product/ProductGrid'
import { Button } from '../components/ui/Button'
import type { Category } from '../types'

const categories: { category: Category; image: string }[] = [
	{
		category: 'rings',
		image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
	},
	{
		category: 'necklaces',
		image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
	},
	{
		category: 'earrings',
		image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
	},
	{
		category: 'bracelets',
		image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400',
	},
]

export function HomePage() {
	const featuredProducts = getFeaturedProducts().slice(0, 8)

	return (
		<div>
			{/* Hero Section */}
			<section className='hero-section relative bg-primary text-white'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 lg:py-24'>
						<div>
							<h1 className='font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-white'>
								Biżuteria, która
								<br />
								<span className='text-accent'>opowiada historię</span>
							</h1>
							<p className='hero-text mt-6 text-lg text-white/80 leading-relaxed max-w-lg'>
								Odkryj kolekcję ekskluzywnej biżuterii. Każdy element to dzieło rzemiosła, stworzone z pasją i dbałością
								o detale.
							</p>
							<div className='mt-8 flex flex-wrap gap-4'>
								<Link to='/katalog'>
									<Button variant='secondary' size='lg' className='hero-btn-primary'>
										Przeglądaj kolekcję
									</Button>
								</Link>
								<Link to='/katalog?kategoria=wedding'>
									<Button
										variant='outline'
										size='lg'
										className='hero-btn-outline border-white text-white hover:bg-white hover:text-black'>
										Obrączki ślubne
									</Button>
								</Link>
							</div>
						</div>
						<div className='hidden lg:block'>
							<div className='aspect-square rounded-2xl overflow-hidden'>
								<img
									src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
									alt='Kolekcja biżuterii Aurelius'
									className='w-full h-full object-cover'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className='py-16 lg:py-24' aria-labelledby='categories-heading'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2
						id='categories-heading'
						className='font-heading text-3xl lg:text-4xl font-semibold text-center mb-12 text-text'>
						Przeglądaj kategorie
					</h2>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
						{categories.map(({ category, image }) => (
							<Link
								key={category}
								to={`/katalog?kategoria=${category}`}
								className='group relative aspect-square rounded-lg overflow-hidden'>
								<img
									src={image}
									alt={categoryNames[category]}
									loading='lazy'
									className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
								<div className='absolute bottom-0 left-0 right-0 p-4'>
									<h3 className='font-heading text-lg lg:text-xl font-medium text-white'>{categoryNames[category]}</h3>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<section className='py-16 lg:py-24 bg-background' aria-labelledby='featured-heading'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12'>
						<div>
							<h2 id='featured-heading' className='font-heading text-3xl lg:text-4xl font-semibold text-text'>
								Bestsellery
							</h2>
							<p className='mt-2 text-text-muted'>Nasze najpopularniejsze produkty wybierane przez klientów</p>
						</div>
						<Link to='/katalog'>
							<Button variant='outline'>Zobacz wszystkie</Button>
						</Link>
					</div>
					<ProductGrid products={featuredProducts} />
				</div>
			</section>

			{/* Trust Section */}
			<section className='py-16 lg:py-24'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
						<div className='text-center'>
							<div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10 text-accent'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='32'
									height='32'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.5'
									aria-hidden='true'>
									<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
									<path d='m9 12 2 2 4-4' />
								</svg>
							</div>
							<h3 className='font-heading text-lg font-semibold mb-2 text-text'>Certyfikowana jakość</h3>
							<p className='text-sm text-text-muted'>
								Wszystkie nasze produkty posiadają certyfikaty autentyczności i są wykonane z najwyższej jakości
								materiałów.
							</p>
						</div>

						<div className='text-center'>
							<div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10 text-accent'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='32'
									height='32'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.5'
									aria-hidden='true'>
									<rect width='16' height='13' x='4' y='5' rx='2' />
									<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
								</svg>
							</div>
							<h3 className='font-heading text-lg font-semibold mb-2 text-text'>Darmowa dostawa</h3>
							<p className='text-sm text-text-muted'>
								Przy zamówieniach powyżej 500 zł oferujemy bezpłatną dostawę na terenie całej Polski.
							</p>
						</div>

						<div className='text-center'>
							<div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10 text-accent'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='32'
									height='32'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.5'
									aria-hidden='true'>
									<path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
									<path d='m3.3 7 8.7 5 8.7-5' />
									<path d='M12 22V12' />
								</svg>
							</div>
							<h3 className='font-heading text-lg font-semibold mb-2 text-text'>Eleganckie opakowanie</h3>
							<p className='text-sm text-text-muted'>
								Każdy produkt jest starannie zapakowany w luksusowe pudełko, idealne na prezent.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className='hero-section py-16 lg:py-24 bg-primary text-white'>
				<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='font-heading text-3xl lg:text-4xl font-semibold mb-4 text-white'>Bądź na bieżąco</h2>
					<p className='hero-text text-white/80 mb-8'>
						Zapisz się do newslettera i otrzymuj informacje o nowościach, promocjach i ekskluzywnych ofertach.
					</p>
					<form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto' onSubmit={e => e.preventDefault()}>
						<label htmlFor='newsletter-email' className='sr-only'>
							Adres email
						</label>
						<input
							type='email'
							id='newsletter-email'
							placeholder='Twój adres email'
							className='newsletter-input flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent'
							required
						/>
						<Button type='submit' variant='secondary' className='hero-btn-primary'>
							Zapisz się
						</Button>
					</form>
				</div>
			</section>
		</div>
	)
}
