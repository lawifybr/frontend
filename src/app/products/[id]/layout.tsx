export default async function ProductLayout({ children,}: { children: React.ReactNode }) {
    return (// responses to children that is page.tsx from the same directory
        <div>
            <h1>Productd</h1>
            {children} 
        </div>
    )
}